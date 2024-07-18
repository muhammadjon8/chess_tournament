import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { JwtModule } from '@nestjs/jwt';
import { Participant } from '../participant/entities/participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Participant]),
    JwtModule.register({}),
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
