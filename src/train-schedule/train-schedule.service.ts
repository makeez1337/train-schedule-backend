import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrainSchedule } from './entities/train-schedule.entity';
import { CreateTrainScheduleRequest } from './request/create-train-schedule.request';
import { TrainsService } from '../trains/trains.service';
import { StationsService } from '../stations/stations.service';
import { UpdateTrainScheduleRequest } from './request/update-train-schedule.request';

@Injectable()
export class TrainScheduleService {
  constructor(
    @InjectRepository(TrainSchedule)
    private readonly trainScheduleRepository: Repository<TrainSchedule>,
    private readonly trainsService: TrainsService,
    private readonly stationsService: StationsService,
  ) {}

  public async findAll(): Promise<TrainSchedule[]> {
    return this.trainScheduleRepository.find({
      relations: { train: true, station_from: true, station_to: true },
    });
  }

  async create(createTrainScheduleRequest: CreateTrainScheduleRequest) {
    const { train_id, station_from_id, station_to_id, ...timeData } =
      createTrainScheduleRequest;

    const { train, station_from, station_to } = await this.getTrainAndStations(
      train_id,
      station_from_id,
      station_to_id,
    );

    const trainScheduleEntity = await this.trainScheduleRepository.create({
      ...timeData,
      train,
      station_from,
      station_to,
    });

    await this.trainScheduleRepository.save(trainScheduleEntity);
  }

  public async updateById(
    id: number,
    updateTrainScheduleRequest: UpdateTrainScheduleRequest,
  ): Promise<void> {
    const { train_id, station_from_id, station_to_id, ...timeData } =
      updateTrainScheduleRequest;

    const { train, station_from, station_to } = await this.getTrainAndStations(
      train_id,
      station_from_id,
      station_to_id,
    );

    await this.trainScheduleRepository.update(
      { id },
      {
        ...timeData,
        train,
        station_from,
        station_to,
      },
    );
  }

  private async getTrainAndStations(
    train_id: number,
    station_from_id: number,
    station_to_id: number,
  ) {
    const train = await this.trainsService.findById(train_id);

    if (!train) {
      throw new NotFoundException(`Train with id=${train_id} not found`);
    }

    const station_from = await this.stationsService.findById(station_from_id);
    const station_to = await this.stationsService.findById(station_to_id);

    if (!station_from) {
      throw new NotFoundException(
        `Station with id=${station_from_id} not found`,
      );
    }

    if (!station_to) {
      throw new NotFoundException(`Station with id=${station_to_id} not found`);
    }

    return {
      train,
      station_from,
      station_to,
    };
  }

  public async findById(id: number): Promise<TrainSchedule> {
    const trainSchedule = await this.trainScheduleRepository.findOne({
      where: { id },
      relations: { train: true, station_from: true, station_to: true },
    });

    if (!trainSchedule) {
      throw new NotFoundException(`Train schedule with id=${id} not found`);
    }

    return trainSchedule;
  }

  public async deleteById(id: any): Promise<void> {
    await this.trainScheduleRepository.delete({ id });
  }
}
