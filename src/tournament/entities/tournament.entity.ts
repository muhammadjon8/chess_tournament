import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsObject, IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsDate()
  start_date: Date;

  @Column()
  @IsDate()
  end_date: Date;
}
