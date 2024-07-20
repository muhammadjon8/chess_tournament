import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leaderboard } from './entities/leaderboard.entity'; // Assuming you have a Leaderboard entity
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async create(createLeaderboardDto: CreateLeaderboardDto) {
    try {
      const leaderboard =
        this.leaderboardRepository.create(createLeaderboardDto);
      return this.leaderboardRepository.save(leaderboard);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    try {
      const leaderboard = await this.leaderboardRepository.find();
      const sortedLeaderboard = leaderboard.sort((a, b) => {
        return b.score - a.score; // Sort by descending order of score
      });
      return sortedLeaderboard;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw new Error('Failed to fetch leaderboard');
    }
  }

  async findOne(id: number) {
    try {
      const leaderboard = await this.leaderboardRepository.findOne({
        where: { id },
      });
      if (!leaderboard) {
        throw new NotFoundException(`Leaderboard with ID ${id} not found`);
      }
      return leaderboard;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateLeaderboardDto: UpdateLeaderboardDto) {
    try {
      await this.leaderboardRepository.update({ id }, updateLeaderboardDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const leaderboardToRemove = await this.findOne(id);
    if ('error' in leaderboardToRemove) {
      // Leaderboard not found, return the error
      return leaderboardToRemove;
    }
    return this.leaderboardRepository.remove([leaderboardToRemove]);
  }
}
