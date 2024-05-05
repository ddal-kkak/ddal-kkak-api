import { Controller } from '@nestjs/common';
import { MetasService } from './metas.service';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}
}
