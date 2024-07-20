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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'; // Import Swagger decorators
import { PlayerTourService } from './player_tour.service';
import { CreatePlayerTourDto } from './dto/create-player_tour.dto';
import { UpdatePlayerTourDto } from './dto/update-player_tour.dto';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Player Tour') // Optional: Tag for Swagger UI
@Controller('player-tour')
export class PlayerTourController {
  constructor(private readonly playerTourService: PlayerTourService) {}

  @ApiOperation({ summary: 'Create a player tour' })
  @ApiResponse({
    status: 201,
    description: 'The player tour has been successfully created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. Invalid data format.',
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPlayerTourDto: CreatePlayerTourDto) {
    return this.playerTourService.create(createPlayerTourDto);
  }

  @ApiOperation({ summary: 'Get all player tours' })
  @ApiResponse({ status: 200, description: 'Returns all player tours.' })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.playerTourService.findAll();
  }

  @ApiOperation({ summary: 'Get a player tour by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the player tour with the specified ID.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Player tour not found.' })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerTourService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a player tour by ID' })
  @ApiResponse({
    status: 200,
    description: 'The player tour has been successfully updated.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Player tour not found.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerTourDto: UpdatePlayerTourDto,
  ) {
    return this.playerTourService.update(+id, updatePlayerTourDto);
  }

  @ApiOperation({ summary: 'Delete a player tour by ID' })
  @ApiResponse({
    status: 200,
    description: 'The player tour has been successfully deleted.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Player tour not found.' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerTourService.remove(+id);
  }
}
