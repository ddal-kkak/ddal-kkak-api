import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from '@/pages/entities/page.entity';
import { MetasModule } from '@/metas/metas.module';

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity]), MetasModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
