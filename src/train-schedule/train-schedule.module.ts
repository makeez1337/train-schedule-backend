import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainScheduleController } from './train-schedule.controller';
import { TrainScheduleService } from './train-schedule.service';
import { TrainSchedule } from './entities/train-schedule.entity';
import { TrainsModule } from '../trains/trains.module';
import { StationsModule } from '../stations/stations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainSchedule]),
    TrainsModule,
    StationsModule,
  ],
  controllers: [TrainScheduleController],
  providers: [TrainScheduleService],
})
export class TrainScheduleModule {}
