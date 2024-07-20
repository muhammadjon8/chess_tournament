import { PartialType } from '@nestjs/swagger';
import { CreateOpponentDto } from './create-opponent.dto';

export class UpdateOpponentDto extends PartialType(CreateOpponentDto) {}
