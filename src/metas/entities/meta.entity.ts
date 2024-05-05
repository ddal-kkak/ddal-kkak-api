import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PageEntity } from '@/pages/entities/page.entity';

@Entity({ name: 'metas' })
export class MetaEntity extends BaseEntity {
  @Column()
  property: string;
  @Column()
  content: string;

  @ManyToOne(() => PageEntity, (page) => page.metas)
  page: PageEntity;
}
