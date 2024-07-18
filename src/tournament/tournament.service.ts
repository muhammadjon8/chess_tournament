import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity'; // Assuming you have a Tournament entity
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Participant } from '../participant/entities/participant.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Participant)
    private readonly participantRepo: Repository<Participant>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    try {
      const tournament = this.tournamentRepository.create(createTournamentDto);
      return this.tournamentRepository.save(tournament);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    try {
      
    } catch (error) {
      throw new NotFoundException('Trouble finding tournaments');
    }
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
}
