import { PartialType } from '@nestjs/mapped-types';
import { CreatePageDto } from './create-page.dto';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PageStatus } from '@/pages/entities/page.entity';
import { Type } from 'class-transformer';
import { UpdateMetaDto } from '@/metas/dto/update-meta.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @IsNumber()
  id: number;

  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateMetaDto)
  metaTagList?: UpdateMetaDto[];
}

export class UpdateStatusPageDto {
  @IsEnum(PageStatus, {
    message: 'status 는 DRAFT 또는 PUBLISHED 여야 합니다.',
  })
  status: PageStatus;
}
