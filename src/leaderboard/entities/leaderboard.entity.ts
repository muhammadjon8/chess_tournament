import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Leaderboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player_id: number;

  @Column()
  score: number;

  @Column()
  tournament_id: number;
}
