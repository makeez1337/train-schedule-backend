import { Body, Controller, Get, Post } from '@nestjs/common';

import { TrainsService } from './trains.service';
import { CreateTrainRequest } from './request/create-train.request';
import { Train } from './entities/train.entity';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Get()
  public async findAll(): Promise<Train[]> {
    return this.trainsService.findAll();
  }

  @Post()
  public async create(
    @Body() createTrainRequest: CreateTrainRequest,
  ): Promise<void> {
    await this.trainsService.create(createTrainRequest);
  }
}
