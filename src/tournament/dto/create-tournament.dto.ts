import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

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
    example: '2024-08-01',
    description: 'The start date of the tournament',
  })
  @Transform(({ value }) => new Date(value))
  start_date: Date;

  @ApiProperty({
    example: '2024-08-15',
    description: 'The end date of the tournament',
  })
  @Transform(({ value }) => new Date(value))
  end_date: Date;
}
