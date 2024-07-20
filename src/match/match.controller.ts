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
} from '@nestjs/swagger';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchService } from './match.service';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Matches') // Optional: Tag for Swagger UI
@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiOperation({ summary: 'Create a match' })
  @ApiResponse({
    status: 201,
    description: 'The match has been successfully created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. Invalid data format.',
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({ status: 200, description: 'Returns all matches.' })
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.matchService.findAll();
  }

  @ApiOperation({ summary: 'Get a match by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the match with the specified ID.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Match not found.' })
  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a match by ID' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully updated.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Match not found.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
  }

  @ApiOperation({ summary: 'Delete a match by ID' })
  @ApiResponse({
    status: 200,
    description: 'The match has been successfully deleted.',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Match not found.' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }
}
