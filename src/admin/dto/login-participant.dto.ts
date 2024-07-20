import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({example : "admin"})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example : "secret"})
  @IsString()
  @IsNotEmpty()
  password: string;
}
