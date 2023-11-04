import { Body, Controller, Get, Post } from '@nestjs/common';

import { StationsService } from './stations.service';
import { CreateStationRequest } from './request/create-station.request';
import { Station } from './entities/station.entity';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  public async findAll(): Promise<Station[]> {
    return this.stationsService.findAll();
  }

  @Post()
  public async create(
    @Body() createStationRequest: CreateStationRequest,
  ): Promise<void> {
    await this.stationsService.create(createStationRequest);
  }
}
