import { PageStatus } from '@/pages/entities/page.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseMetaDto } from '@/metas/dto/response-meta.dto';

export class ResponsePageDto {
  @ApiProperty({
    example: 1,
    description: '페이지의 고유 ID입니다.',
  })
  id: number;

  @ApiProperty({
    example: '치킨 할인 페이지',
    description: '페이지의 제목입니다.',
  })
  title: string;

  @ApiProperty({
    example: 'chicken-discount',
    description: '페이지의 고유 슬러그입니다.',
  })
  slug: string;

  @ApiProperty({
    example: 'DRAFT',
    description: '페이지의 상태입니다.',
    enum: ['DRAFT', 'PUBLISHED'],
  })
  status: PageStatus;

  @ApiProperty({
    example: {},
    description: '페이지의 UI 데이터입니다. 아직 미정...ㅠ_ㅠ',
  })
  uiJson: Record<string, any>;

  @ApiPropertyOptional({
    type: [ResponseMetaDto],
    example: [
      {
        property: 'og:title',
        content: '치킨 할인 페이지',
      },
      {
        property: 'og:description',
        content: '치킨 할인 페이지에 오신 것을 환영합니다.',
      },
    ],
    description: '페이지에 연관된 메타 태그 리스트입니다.',
    nullable: true,
  })
  metaTagList: {
    property: string;
    content: string;
  }[];
}
