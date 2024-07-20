import { ApiProperty } from '@nestjs/swagger';
import { Decimal128 } from 'typeorm';

export class CreateMatchDto {
  @ApiProperty({ example: 1, description: 'ID of player 1' })
  player1_id: number;

  @ApiProperty({ example: 2, description: 'ID of player 2' })
  player2_id: number;

  @ApiProperty({ example: 1, description: 'player2 score' })
  player1_score: number;

  @ApiProperty({ example: 'Player1 score', description: 'Result of the match' })
  player2_score: number;

  @ApiProperty({ example: 1, description: 'ID of the tournament' })
  tournament_id: number;
}
