import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMetaDto } from '@/metas/dto/create-meta.dto';

export class CreatePageDto {
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  @MaxLength(20)
  slug: string;

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaDto)
  metaTagList?: CreateMetaDto[];

  uiJson: Record<string, any>;
}
