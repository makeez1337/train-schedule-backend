import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateTrainScheduleRequest } from './request/create-train-schedule.request';
import { TrainScheduleService } from './train-schedule.service';
import { TrainSchedule } from './entities/train-schedule.entity';
import { UpdateTrainScheduleRequest } from './request/update-train-schedule.request';
import { OperationByIdParam } from './param/operation-by-id.param';
import { SortQuery } from './query/sort.query';

@Controller('train-schedule')
export class TrainScheduleController {
  constructor(private readonly trainScheduleService: TrainScheduleService) {}

  @Get()
  public async findAll(
    @Query() sortQuery: SortQuery,
  ): Promise<TrainSchedule[]> {
    console.log(sortQuery);
    return this.trainScheduleService.findAll(sortQuery);
  }

  @Get(':id')
  public async findById(
    @Param() { id }: OperationByIdParam,
  ): Promise<TrainSchedule> {
    return this.trainScheduleService.findById(Number(id));
  }

  @Post()
  public async create(
    @Body() createTrainScheduleRequest: CreateTrainScheduleRequest,
  ): Promise<void> {
    await this.trainScheduleService.create(createTrainScheduleRequest);
  }

  @Put(':id')
  public async updateById(
    @Param() { id }: OperationByIdParam,
    @Body() updateTrainScheduleRequest: UpdateTrainScheduleRequest,
  ) {
    await this.trainScheduleService.updateById(
      Number(id),
      updateTrainScheduleRequest,
    );
  }

  @Delete(':id')
  public async deleteById(@Param() { id }: OperationByIdParam): Promise<void> {
    await this.trainScheduleService.deleteById(id);
  }
}
