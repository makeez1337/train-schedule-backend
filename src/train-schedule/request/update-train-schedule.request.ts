import { IsDateString, IsNumber, Min } from 'class-validator';

export class UpdateTrainScheduleRequest {
  @IsDateString()
  arrive_time: string;

  @IsDateString()
  departure_time: string;

  @IsNumber()
  @Min(1)
  train_id: number;

  @IsNumber()
  @Min(1)
  station_from_id: number;

  @IsNumber()
  @Min(1)
  station_to_id: number;
}
