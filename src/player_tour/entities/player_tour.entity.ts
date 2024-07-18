import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerTour {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  player_id: number;
  @Column()
  tournament_id: number;
}
