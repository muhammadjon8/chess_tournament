import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tour_number: number;

  @Column()
  player1_id: number;

  @Column()
  player2_id: number;

  @Column()
  result: string;

  @Column()
  tournament_id: number;
}
