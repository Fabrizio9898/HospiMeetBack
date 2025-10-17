import { Controller } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}
}
