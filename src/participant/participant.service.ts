import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from './entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-participant.dto';
@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(user: Participant) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async create(createUserDto: CreateParticipantDto, res: Response) {
    const existingUser = await this.participantRepository.findOne({
      where: { phone: createUserDto.phone },
    });

    if (existingUser) {
      throw new BadRequestException('User already registered');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = this.participantRepository.create({
      ...createUserDto,
      password: hashed_password,
    });

    await this.participantRepository.save(newUser);

    const tokens = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    newUser.refreshToken = hashed_refresh_token;
    await this.participantRepository.save(newUser);

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json({
      message: 'Registration successful',
      user: newUser,
      tokens,
    });
  }

  async findAll() {
    return this.participantRepository.find();
  }

  async findOne(id: number) {
    try {
      const participant = await this.participantRepository.findOne({
        where: { id },
      });
      if (!participant) {
        throw new NotFoundException(`Participant with ID ${id} not found`);
      }
      return participant;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateParticipantDto: UpdateParticipantDto) {
    try {
      await this.participantRepository.update({ id }, updateParticipantDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const participantToRemove = await this.findOne(id);
    if ('error' in participantToRemove) {
      // Participant not found, return the error
      return participantToRemove;
    }
    return this.participantRepository.remove([participantToRemove]);
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.participantRepository.findOne({
      where: { phone: loginUserDto.phone },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    user.refreshToken = hashed_refresh_token;
    await this.participantRepository.save(user);

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true,
    });

    return {
      status: 200,
      data: {
        message: 'Login successful',
        user: user,
        tokens: tokens,
      },
    };
  }
}
