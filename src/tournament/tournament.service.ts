import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity'; // Assuming you have a Tournament entity
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Match } from '../match/entities/match.entity';
import { PlayerTour } from '../player_tour/entities/player_tour.entity';
import { Opponent } from '../opponents/entities/opponent.entity';
import { Leaderboard } from '../leaderboard/entities/leaderboard.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
    @InjectRepository(PlayerTour)
    private readonly playerTourRepo: Repository<PlayerTour>,
    @InjectRepository(Opponent)
    private readonly opponentRepo: Repository<Opponent>,
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepo: Repository<Leaderboard>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    try {
      const { name, start_date, end_date } = createTournamentDto;

      const tournament = this.tournamentRepository.create({
        name,
        start_date,
        end_date,
      });

      return await this.tournamentRepository.save(tournament);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.tournamentRepository.find();
  }

  async findOne(id: number) {
    try {
      const tournament = await this.tournamentRepository.findOne({
        where: { id },
      });
      if (!tournament) {
        throw new NotFoundException(`Tournament with ID ${id} not found`);
      }
      return tournament;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    try {
      await this.tournamentRepository.update({ id }, updateTournamentDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const tournamentToRemove = await this.findOne(id);
    if ('error' in tournamentToRemove) {
      // Tournament not found, return the error
      return tournamentToRemove;
    }
    return this.tournamentRepository.remove([tournamentToRemove]);
  }
  async startTournament(id: number) {
    try {
      const tournament = await this.findOne(id);
      if ('error' in tournament) {
        // Tournament not found, return the error
        return tournament;
      }

      // Fetch participants for the tournament
      const participants = await this.playerTourRepo.find({
        where: { tournament_id: id },
      });

      if (participants.length < 4 || participants.length % 2 !== 0) {
        throw new Error(
          'Not enough or unpairable participants to start the tournament',
        );
      }

      // Shuffle participants
      const shuffledParticipants = await this.shuffleArray(participants);

      // Assign and save matches to the database
      for (let i = 0; i < shuffledParticipants.length; i += 2) {
        await this.matchRepo.save({
          player1_id: shuffledParticipants[i].player_id,
          player2_id: shuffledParticipants[i + 1].player_id,
          tournament_id: id,
          round: 0,
        });
        await this.opponentRepo.save({
          player1_id: shuffledParticipants[i].player_id,
          player2_id: shuffledParticipants[i + 1].player_id,
          tournament_id: id,
        });
        await this.leaderboardRepo.save({
          player_id: shuffledParticipants[i].player_id,
          score: 0,
          tournament_id: id,
        });
        await this.leaderboardRepo.save({
          player_id: shuffledParticipants[i + 1].player_id,
          score: 0,
          tournament_id: id,
        });
      }

      // Return success or some meaningful response
      return { success: true, message: 'Tournament started successfully' };
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error starting the tournament:', error);
      // Rethrow the error or handle it as needed
      throw new Error('Failed to start the tournament');
    }
  }

  async shuffleArray<T>(array: T[]): Promise<T[]> {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  async startRound(tournamentId: number, round: number) {
    try {
      // Fetch all participants' scores from the leaderboards table
      const leaderboardEntries = await this.leaderboardRepo.find({
        where: { tournament_id: tournamentId },
      });

      // Create a map of player scores
      const playerScores = {};
      leaderboardEntries.forEach((entry) => {
        playerScores[entry.player_id] = entry.score;
      });

      // Fetch all participants
      const participants = leaderboardEntries.map((entry) => ({
        player_id: entry.player_id,
        score: entry.score,
      }));

      // Sort participants by their scores
      const sortedParticipants = participants.sort((a, b) => b.score - a.score);

      // Fetch all previous opponents
      const previousOpponents = await this.opponentRepo.find({
        where: { tournament_id: tournamentId },
      });
      const previousPairs = new Set();
      previousOpponents.forEach((opponent) => {
        previousPairs.add(`${opponent.player1_id}-${opponent.player2_id}`);
        previousPairs.add(`${opponent.player2_id}-${opponent.player1_id}`);
      });

      // Pair participants
      const pairedParticipants = [];
      const unpairedParticipants = [...sortedParticipants];

      while (unpairedParticipants.length > 1) {
        const player1 = unpairedParticipants.shift();
        let player2Index = unpairedParticipants.findIndex(
          (player) =>
            !previousPairs.has(`${player1.player_id}-${player.player_id}`),
        );

        // If no suitable player2 is found, pick the next available player
        if (player2Index === -1) player2Index = 0;

        const player2 = unpairedParticipants.splice(player2Index, 1)[0];

        pairedParticipants.push([player1.player_id, player2.player_id]);
      }

      // Handle odd number of participants
      if (unpairedParticipants.length === 1) {
        // Here you might want to handle the odd participant, e.g., give a bye or handle it according to your rules
        // For now, let's log this participant for further handling
        console.log('Odd participant:', unpairedParticipants[0]);
      }

      // Assign and save matches to the database
      for (const [player1_id, player2_id] of pairedParticipants) {
        await this.matchRepo.save({
          player1_id,
          player2_id,
          tournament_id: tournamentId,
          round: round,
        });
        await this.opponentRepo.save({
          player1_id,
          player2_id,
          tournament_id: tournamentId,
        });
      }

      // Return success or some meaningful response
      return { success: true, message: `Round ${round} started successfully` };
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error starting the round:', error);
      // Rethrow the error or handle it as needed
      throw new Error('Failed to start the round');
    }
  }
}
