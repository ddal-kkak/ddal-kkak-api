import { Injectable } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
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

  create(createMetaDto: CreateMetaDto) {
    return 'This action adds a new meta';
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

  findAll() {
    return `This action returns all metas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meta`;
  }

  update(id: number, updateMetaDto: UpdateMetaDto) {
    return `This action updates a #${id} meta`;
  }

  remove(id: number) {
    return `This action removes a #${id} meta`;
  }
}
