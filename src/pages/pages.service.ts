import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Repository } from 'typeorm';
import { PageEntity } from '@/pages/entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetasService } from '@/metas/metas.service';
import { CreateMetaDto } from '@/metas/dto/create-meta.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PageEntity)
    private pagesRepository: Repository<PageEntity>,
    private readonly metasService: MetasService,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const page = await this.createPage(createPageDto);
    const { metaTagList } = createPageDto;
    const returnMetaTagList: CreateMetaDto[] = [];
    for (const metaTag of metaTagList) {
      await this.metasService.createMetaTag(page, metaTag);
      returnMetaTagList.push(metaTag);
    }
    return { page, metaTagList: returnMetaTagList };
  }

  async createPage(createPageDto: Omit<CreatePageDto, 'metaTagList'>) {
    const { title, slug, uiJson } = createPageDto;
    const page = this.pagesRepository.create({
      title,
      slug,
      uiJson,
    });
    await this.pagesRepository.save(page);
    return page;
  }

  findAll() {
    return `This action returns all pages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
