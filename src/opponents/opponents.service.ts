import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opponent } from './entities/opponent.entity'; // Assuming you have a Opponent entity
import { CreateOpponentDto } from './dto/create-opponent.dto';
import { UpdateOpponentDto } from './dto/update-opponent.dto';

@Injectable()
export class OpponentService {
  constructor(
    @InjectRepository(Opponent)
    private readonly opponentRepository: Repository<Opponent>,
  ) {}

  async create(createOpponentDto: CreateOpponentDto) {
    try {
      const opponent = this.opponentRepository.create(createOpponentDto);
      return this.opponentRepository.save(opponent);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.opponentRepository.find();
  }

  async findOne(id: number) {
    try {
      const opponent = await this.opponentRepository.findOne({
        where: { id },
      });
      if (!opponent) {
        throw new NotFoundException(`Opponent with ID ${id} not found`);
      }
      return opponent;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateOpponentDto: UpdateOpponentDto) {
    try {
      await this.opponentRepository.update({ id }, updateOpponentDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const opponentToRemove = await this.findOne(id);
    if ('error' in opponentToRemove) {
      // Opponent not found, return the error
      return opponentToRemove;
    }
    return this.opponentRepository.remove([opponentToRemove]);
  }
}
