import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { Repository } from 'typeorm';
import { PageEntity } from '@/pages/entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetasService } from '@/metas/metas.service';
import { UpdatePageDto } from '@/pages/dto/update-page.dto';

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

    const metaTagsPromises = metaTagList.map((metaTag) =>
      this.metasService.createMetaTag(page, metaTag),
    );
    const returnMetaTagList = await Promise.all(metaTagsPromises);

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
    return this.pagesRepository.find();
  }

  findOne(id: number) {
    const page = this.pagesRepository.findOne({
      where: { id },
    });

    if (!page) {
      throw new NotFoundException('해당 id 의 page 를 찾을 수 없습니다.');
    }

    return page;
  }

  findOneWithMetaTag(id: number) {
    return this.pagesRepository.findOne({
      where: { id },
      relations: ['metaTagList'],
    });
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    const { metaTagList, ...pageInfo } = updatePageDto;
    await this.updatePage(id, pageInfo);
    await this.metasService.updateMetaTagList(metaTagList);

    return {
      message: '성공',
    };
  }

  async updatePage(
    id: number,
    updatePageDto: Omit<UpdatePageDto, 'metaTagList'>,
  ) {
    const page = await this.findOne(id);

    if (updatePageDto.title) {
      page.title = updatePageDto.title;
    }
    if (updatePageDto.slug) {
      page.slug = updatePageDto.slug;
    }
    if (updatePageDto.uiJson) {
      page.uiJson = updatePageDto.uiJson;
    }

    return await this.pagesRepository.save(page);
  }
}
