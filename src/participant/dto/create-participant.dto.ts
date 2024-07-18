import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateParticipantDto {
  @ApiProperty({ example: 'Muhammadjon', description: "Participant's Name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 23, description: "Participant's age" })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ example: '800', description: "Participant's rating" })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Uzbekistan',
    description: "Participant's citizenship",
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: '+998991234567',
    description: "Participant's phone number",
  })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({
    example: 'My$ecr&tp@ssw0rd',
    description: "Participant's password",
  })
  password: string;

  @ApiProperty({
    example: 1,
    description: "Participant's tournament id",
  })
  @IsNumber()
  @IsNotEmpty()
  tournament_id: number;
}
