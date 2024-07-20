import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Leaderboard } from '../leaderboard/entities/leaderboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Leaderboard])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
