import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import {
  UpdatePageDto,
  UpdateStatusPageDto,
} from '@/pages/dto/update-page.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponsePageDto } from '@/pages/dto/response-page-dto';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get(':id')
  @ApiOperation({
    summary: '페이지 상세 검색',
    description: '주어진 ID를 가진 단일 페이지의 상세 정보를 검색합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '요청된 페이지의 상세 정보를 반환합니다.',
    type: ResponsePageDto,
  })
  @ApiResponse({
    status: 404,
    description: '주어진 ID를 가진 페이지를 찾을 수 없습니다.',
  })
  findOne(@Param('id') id: string) {
    return this.pagesService.findOneWithMetaTag(+id);
  }

  @Get()
  @ApiOperation({
    summary: '모든 페이지 검색',
    description: '시스템에 저장된 모든 페이지를 반환합니다.',
  })
  @ApiResponse({ status: 200, description: '모든 페이지 리스트를 반환합니다.' })
  findAll() {
    return this.pagesService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: '새 페이지 생성',
    description:
      '새로운 페이지를 생성합니다. 필요한 모든 메타 태그 정보와 함께 페이지 데이터를 제공해야 합니다.',
  })
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatus: UpdateStatusPageDto,
  ) {
    return this.pagesService.updateStatus(+id, updateStatus.status);
  }
}
