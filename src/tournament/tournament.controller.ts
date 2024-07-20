import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { Match } from '../match/entities/match.entity';

@ApiTags('Tournaments')
@Controller('tournament')
export class TournamentController {
  constructor(
    private readonly tournamentService: TournamentService,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  @ApiOperation({ summary: 'Create a new tournament' })
  @ApiResponse({
    status: 201,
    description: 'The tournament has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(createTournamentDto);
  }

  @ApiOperation({ summary: 'Retrieve all tournaments' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all tournaments.',
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.tournamentService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the tournament.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The tournament has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentService.update(+id, updateTournamentDto);
  }

  @ApiOperation({ summary: 'Delete a tournament by ID' })
  @ApiResponse({
    status: 200,
    description: 'The tournament has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentService.remove(+id);
  }
  @Post(':id/start')
  async startTournament(@Param('id') id: number) {
    // const isIdExists = this.tournamentRepository.find({ where: { id: id } });
    // if (!isIdExists) {
      return await this.tournamentService.startTournament(id);
    // }
    // return {
    //   error:
    //     'Tournament already started, if you want changes then delete the tournament',
    // };
  }
  @Post(':id/round/:round')
  startRound(@Param('id') id: number, @Param('round') round: number) {
    // const isIdExists = this.matchRepo.find({ where: { round: round } });
    // if (!isIdExists) {
      return this.tournamentService.startRound(id, round);
    // }
    // return {
    //   error: 'Round already started, if you want changes then delete the round',
    // };
  }
}
