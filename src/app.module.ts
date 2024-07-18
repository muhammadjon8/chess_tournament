import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/entities/admin.entity';
import { ParticipantModule } from './participant/participant.module';
import { AdminModule } from './admin/admin.module';
import { Participant } from './participant/entities/participant.entity';
import { TournamentModule } from './tournament/tournament.module';
import { PlayerTourModule } from './player_tour/player_tour.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Admin, Participant],
      synchronize: true,
      logging: false,
    }),
    ParticipantModule,
    AdminModule,
    TournamentModule,
    PlayerTourModule,
    MatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
