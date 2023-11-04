import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTrainRequest } from './request/create-train.request';
import { Train } from './entities/train.entity';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private readonly trainsRepository: Repository<Train>,
  ) {}

  public async findById(id: number): Promise<Train | null> {
    return this.trainsRepository.findOneBy({ id });
  }

  public async create(createTrainRequest: CreateTrainRequest): Promise<void> {
    const trainEntity = await this.trainsRepository.create(createTrainRequest);
    await this.trainsRepository.save(trainEntity);
  }

  public async findAll(): Promise<Train[]> {
    return this.trainsRepository.find();
  }
}
