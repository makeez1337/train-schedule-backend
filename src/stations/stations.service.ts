import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Station } from './entities/station.entity';
import { CreateStationRequest } from './request/create-station.request';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationsRepository: Repository<Station>,
  ) {}

  public async findById(id: number): Promise<Station | null> {
    return this.stationsRepository.findOneBy({ id });
  }

  public async create(
    createStationRequest: CreateStationRequest,
  ): Promise<void> {
    const stationEntity = await this.stationsRepository.create(
      createStationRequest,
    );
    await this.stationsRepository.save(stationEntity);
  }

  public async findAll(): Promise<Station[]> {
    return this.stationsRepository.find();
  }
}
