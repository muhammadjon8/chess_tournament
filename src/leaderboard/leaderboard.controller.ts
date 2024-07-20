import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';
import { Leaderboard } from './entities/leaderboard.entity'; // Assuming you have this entity

@ApiTags('leaderboard') // Tag for Swagger documentation
@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a leaderboard entry' })
  @ApiResponse({
    status: 201,
    description: 'The leaderboard entry has been successfully created.',
    type: Leaderboard,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createLeaderboardDto: CreateLeaderboardDto) {
    return this.leaderboardService.create(createLeaderboardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leaderboard entries' })
  @ApiResponse({
    status: 200,
    description: 'List of leaderboard entries.',
    type: [Leaderboard],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    return this.leaderboardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a leaderboard entry by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Leaderboard entry ID' })
  @ApiResponse({
    status: 200,
    description: 'The found leaderboard entry.',
    type: Leaderboard,
  })
  @ApiResponse({ status: 404, description: 'Leaderboard entry not found.' })
  findOne(@Param('id') id: string) {
    return this.leaderboardService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a leaderboard entry' })
  @ApiParam({ name: 'id', type: 'number', description: 'Leaderboard entry ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated leaderboard entry.',
    type: Leaderboard,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Leaderboard entry not found.' })
  update(
    @Param('id') id: string,
    @Body() updateLeaderboardDto: UpdateLeaderboardDto,
  ) {
    return this.leaderboardService.update(+id, updateLeaderboardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a leaderboard entry' })
  @ApiParam({ name: 'id', type: 'number', description: 'Leaderboard entry ID' })
  @ApiResponse({
    status: 200,
    description: 'The leaderboard entry has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Leaderboard entry not found.' })
  remove(@Param('id') id: string) {
    return this.leaderboardService.remove(+id);
  }
}
