import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player1_id: number;

  @Column()
  player2_id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  player1_score: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  player2_score: number;

  @Column()
  tournament_id: number;

  @Column()
  round: number;
}
