import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetaDto {
  @ApiProperty({
    example: 'description',
    description: '메타 태그의 속성(키) 이름입니다.',
  })
  @IsString()
  @IsNotEmpty()
  property: string;

  @ApiProperty({
    example: '이 페이지는 치킨 할인 정보를 제공합니다.',
    description: '메타 태그의 내용입니다.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
