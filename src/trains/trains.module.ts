import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainsController } from './trains.controller';
import { TrainsService } from './trains.service';
import { Train } from './entities/train.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainsController],
  providers: [TrainsService],
  exports: [TrainsService],
})
export class TrainsModule {}
