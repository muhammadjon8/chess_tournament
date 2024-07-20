import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { JwtModule } from '@nestjs/jwt';
import { Participant } from '../participant/entities/participant.entity';
import { Match } from '../match/entities/match.entity';
import { PlayerTour } from '../player_tour/entities/player_tour.entity';
import { Opponent } from '../opponents/entities/opponent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Participant, Match, PlayerTour, Opponent]),
    JwtModule.register({}),
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
