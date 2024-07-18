import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity'; // Assuming you have a Match entity
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
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
