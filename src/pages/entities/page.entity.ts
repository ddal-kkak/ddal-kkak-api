import { BaseEntity } from '@/common/entities/base.entity';

export class Page extends BaseEntity {
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  uiJson: Record<string, any>;
}
