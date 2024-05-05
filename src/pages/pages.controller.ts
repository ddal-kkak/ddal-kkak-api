import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from '@/pages/dto/update-page.dto';
import { PageStatus } from '@/pages/entities/page.entity';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOneWithMetaTag(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: PageStatus) {
    return this.pagesService.updateStatus(+id, status);
  }
}
