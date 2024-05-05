import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaEntity } from '@/metas/entities/meta.entity';
import { Repository } from 'typeorm';
import { PageEntity } from '@/pages/entities/page.entity';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(MetaEntity)
    private metasRepository: Repository<MetaEntity>,
  ) {}

  async findOne(id: number) {
    const metaTag = await this.metasRepository.findOne({
      where: { id },
    });

    if (!metaTag) {
      throw new NotFoundException('해당 Meta Tag 를 찾을 수 없습니다.');
    }

    return metaTag;
  }

  async createMetaTag(page: PageEntity, metaTag: CreateMetaDto) {
    const { property, content } = metaTag;
    const meta = this.metasRepository.create({
      property,
      content,
      page,
    });

    return this.metasRepository.save(meta);
  }
}
