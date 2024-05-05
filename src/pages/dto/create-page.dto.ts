import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMetaDto } from '@/metas/dto/create-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({
    example: '치킨 할인 페이지',
    description: '페이지의 제목입니다.',
  })
  @IsNotEmpty()
  @MaxLength(20)
  title: string;

  @ApiProperty({
    example: 'chicken-discount',
    description: '페이지의 고유 슬러그입니다.',
  })
  @IsNotEmpty()
  @MaxLength(20)
  slug: string;

  @ApiProperty({
    type: [CreateMetaDto],
    example: [
      {
        property: 'description',
        content: '이 페이지는 치킨 할인 정보를 제공합니다.',
      },
    ],
    description: '페이지에 연관된 메타 태그 리스트입니다.',
  })
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaDto)
  metaTagList?: CreateMetaDto[];

  uiJson: Record<string, any>;
}
