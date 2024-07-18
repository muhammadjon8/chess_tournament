import { IsString, IsDate, IsObject, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateTournamentDto {
  @ApiProperty({
    example: 'Chess Championship',
    description: 'The name of the tournament',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2024-08-01T00:00:00.000Z',
    description: 'The start date of the tournament',
  })
  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @ApiProperty({
    example: '2024-08-15T00:00:00.000Z',
    description: 'The end date of the tournament',
  })
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
