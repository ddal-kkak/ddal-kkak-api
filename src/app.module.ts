import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from './common/common.module';
import { MetasModule } from './metas/metas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PagesModule,
    CommonModule,
    MetasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
