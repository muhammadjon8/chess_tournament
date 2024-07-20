import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsString, IsNotEmpty } from 'class-validator';

@Entity('tournament')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({nullable: true})
  start_date: Date;

  @Column({nullable: true})
  end_date: Date;
}
