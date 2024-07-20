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
import { OpponentService } from './opponents.service';
import { CreateOpponentDto } from './dto/create-opponent.dto';
import { UpdateOpponentDto } from './dto/update-opponent.dto';
import { Opponent } from './entities/opponent.entity';

@ApiTags('opponents') // Tag for Swagger documentation
@Controller('opponents')
export class OpponentsController {
  constructor(private readonly opponentsService: OpponentService) {}

  @Post()
  @ApiOperation({ summary: 'Create an opponent' })
  @ApiResponse({
    status: 201,
    description: 'The opponent has been successfully created.',
    type: Opponent,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createOpponentDto: CreateOpponentDto) {
    return this.opponentsService.create(createOpponentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all opponents' })
  @ApiResponse({
    status: 200,
    description: 'List of opponents.',
    type: [Opponent],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    return this.opponentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an opponent by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Opponent ID' })
  @ApiResponse({
    status: 200,
    description: 'The found opponent.',
    type: Opponent,
  })
  @ApiResponse({ status: 404, description: 'Opponent not found.' })
  findOne(@Param('id') id: string) {
    return this.opponentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an opponent' })
  @ApiParam({ name: 'id', type: 'number', description: 'Opponent ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated opponent.',
    type: Opponent,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Opponent not found.' })
  update(
    @Param('id') id: string,
    @Body() updateOpponentDto: UpdateOpponentDto,
  ) {
    return this.opponentsService.update(+id, updateOpponentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an opponent' })
  @ApiParam({ name: 'id', type: 'number', description: 'Opponent ID' })
  @ApiResponse({
    status: 200,
    description: 'The opponent has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Opponent not found.' })
  remove(@Param('id') id: string) {
    return this.opponentsService.remove(+id);
  }
}
