import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Opponent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  player1_id: number;
  @Column()
  player2_id: number;
  @Column()
  tournament_id: number;
}
