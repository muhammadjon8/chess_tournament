import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty({ example: 1, description: 'The tour number' })
  tour_number: number;

  @ApiProperty({ example: 1, description: 'ID of player 1' })
  player1_id: number;

  @ApiProperty({ example: 2, description: 'ID of player 2' })
  player2_id: number;

  @ApiProperty({ example: 'Player 1 wins', description: 'Result of the match' })
  result: string;

  @ApiProperty({ example: 1, description: 'ID of the tournament' })
  tournament_id: number;
}
