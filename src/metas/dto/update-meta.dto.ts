import { CreateMetaDto } from './create-meta.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMetaDto extends CreateMetaDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
