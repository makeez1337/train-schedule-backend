import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { dataSourceOptions } from '../ormconfig';
import { TrainsModule } from './trains/trains.module';
import { StationsModule } from './stations/stations.module';
import { TrainScheduleModule } from './train-schedule/train-schedule.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './validators/config.schema';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TrainsModule,
    StationsModule,
    TrainScheduleModule,
    UsersModule,
    TokensModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
