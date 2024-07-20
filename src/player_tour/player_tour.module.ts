import { Module } from '@nestjs/common';
import { PlayerTourService } from './player_tour.service';
import { PlayerTourController } from './player_tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerTour } from './entities/player_tour.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerTour]), JwtModule.register({})],
  controllers: [PlayerTourController],
  providers: [PlayerTourService],
})
export class PlayerTourModule {}
