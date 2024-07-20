import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity'; // Assuming you have a Match entity
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Leaderboard } from '../leaderboard/entities/leaderboard.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepo: Repository<Leaderboard>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    try {
      const match = this.matchRepository.create(createMatchDto);
      return this.matchRepository.save(match);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.matchRepository.find();
  }

  async findOne(id: number) {
    try {
      const match = await this.matchRepository.findOne({
        where: { id },
      });
      if (!match) {
        throw new NotFoundException(`Match with ID ${id} not found`);
      }
      return match;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    try {
      const { player1_id, player2_id, player1_score, player2_score } =
        updateMatchDto;
      await this.leaderboardRepo.save({
        player_id: player1_id,
        score: player1_score,
        tournament_id: updateMatchDto.tournament_id,
      });
      await this.leaderboardRepo.save({
        player_id: player2_id,
        score: player2_score,
        tournament_id: updateMatchDto.tournament_id,
      });
      await this.matchRepository.update({ id }, updateMatchDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const matchToRemove = await this.findOne(id);
    if ('error' in matchToRemove) {
      // Match not found, return the error
      return matchToRemove;
    }
    return this.matchRepository.remove([matchToRemove]);
  }
}
