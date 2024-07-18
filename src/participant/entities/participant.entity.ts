import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  rating: number;

  @Column()
  country: string;

  @Column()
  tournament_id: number;

  @Column({ nullable: true, default: 0 })
  score: number;

  @Column({ nullable: true, default: 0 })
  wins: number;

  @Column({ nullable: true, default: 0 })
  losses: number;

  @Column({ nullable: true, default: 0 })
  draws: number;

  @Column()
  password: string;

  @Column({unique: true})
  phone: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  refreshToken: string;
}
