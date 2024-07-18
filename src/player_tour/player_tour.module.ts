import { Module } from '@nestjs/common';
import { PlayerTourService } from './player_tour.service';
import { PlayerTourController } from './player_tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerTour } from './entities/player_tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerTour])],
  controllers: [PlayerTourController],
  providers: [PlayerTourService],
})
export class PlayerTourModule {}
