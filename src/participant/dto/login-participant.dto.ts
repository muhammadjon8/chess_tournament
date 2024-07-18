import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
