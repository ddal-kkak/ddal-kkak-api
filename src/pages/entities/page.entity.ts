import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { MetaEntity } from '@/metas/entities/meta.entity';

export enum PageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity({ name: 'pages' })
export class PageEntity extends BaseEntity {
  @Column({
    length: 20,
  })
  title: string;
  @Column({
    length: 20,
    unique: true,
  })
  slug: string;
  @Column({
    enum: Object.values(PageStatus),
    default: PageStatus.DRAFT,
  })
  status: PageStatus;
  @Column({
    type: 'jsonb',
    default: {},
  })
  uiJson: Record<string, any>;

  @OneToMany(() => MetaEntity, (meta) => meta.page)
  metaTagList: MetaEntity[];
}
