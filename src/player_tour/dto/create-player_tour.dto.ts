import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePlayerTourDto {
  @ApiProperty({ example: 1, description: 'Player ID' })
  @IsNumber()
  player_id: number;

  @ApiProperty({ example: 1, description: 'Tournament ID' })
  @IsNumber()
  tournament_id: number;
}
