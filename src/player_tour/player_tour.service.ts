import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerTour } from './entities/player_tour.entity'; // Assuming you have a PlayerTour entity
import { CreatePlayerTourDto } from './dto/create-player_tour.dto';
import { UpdatePlayerTourDto } from './dto/update-player_tour.dto';

@Injectable()
export class PlayerTourService {
  constructor(
    @InjectRepository(PlayerTour)
    private readonly playerTourRepository: Repository<PlayerTour>,
  ) {}

  async create(createPlayerTourDto: CreatePlayerTourDto) {
    try {
      const playerTour = this.playerTourRepository.create(createPlayerTourDto);
      return this.playerTourRepository.save(playerTour);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.playerTourRepository.find();
  }

  async findOne(id: number) {
    try {
      const playerTour = await this.playerTourRepository.findOne({
        where: { id },
      });
      if (!playerTour) {
        throw new NotFoundException(`PlayerTour with ID ${id} not found`);
      }
      return playerTour;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updatePlayerTourDto: UpdatePlayerTourDto) {
    try {
      await this.playerTourRepository.update({ id }, updatePlayerTourDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const playerTourToRemove = await this.findOne(id);
    if ('error' in playerTourToRemove) {
      // PlayerTour not found, return the error
      return playerTourToRemove;
    }
    return this.playerTourRepository.remove([playerTourToRemove]);
  }
}
