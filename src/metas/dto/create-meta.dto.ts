import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetaDto {
  @IsString()
  @IsNotEmpty()
  property: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
