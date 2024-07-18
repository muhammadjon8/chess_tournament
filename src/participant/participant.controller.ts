import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-participant.dto';

@ApiTags('Participants')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @ApiOperation({ summary: 'Register a new participant' })
  @ApiResponse({
    status: 201,
    description: 'The participant has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/register')
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
    @Res() response: Response,
  ) {
    return await this.participantService.create(createParticipantDto, response);
  }

  @ApiOperation({ summary: 'Login a participant' })
  @ApiResponse({
    status: 201,
    description: 'The participant has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/login')
  async login(
    @Body() loginParticipantDto: LoginUserDto,
    @Res() response: Response,
  ) {
    const result = await this.participantService.login(
      loginParticipantDto,
      response,
    );
    return response.status(result.status).json(result.data);
  }

  @ApiOperation({ summary: 'Retrieve all participants' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all participants.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return await this.participantService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a participant by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the participant.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  @UseGuards(AdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.participantService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a participant by ID' })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return await this.participantService.update(+id, updateParticipantDto);
  }

  @ApiOperation({ summary: 'Delete a participant by ID' })
  @ApiResponse({
    status: 200,
    description: 'The participant has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Participant not found.' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.participantService.remove(+id);
  }
}
