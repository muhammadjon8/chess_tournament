import { Module } from '@nestjs/common';
import { OpponentService } from './opponents.service';
import { OpponentsController } from './opponents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opponent } from './entities/opponent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opponent])],
  controllers: [OpponentsController],
  providers: [OpponentService],
})
export class OpponentsModule {}
