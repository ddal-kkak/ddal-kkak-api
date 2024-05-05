import { CreateMetaDto } from '@/metas/dto/create-meta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ResponseMetaDto extends CreateMetaDto {
  @ApiProperty({
    example: 1,
    description: '메타 태그의 고유 식별자입니다.',
  })
  @IsNumber()
  id: number;
}
