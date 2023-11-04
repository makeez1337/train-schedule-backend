import { IsEnum, IsInt, IsString, MinLength } from 'class-validator';

import { TrainType } from '../enums/train-type.enum';

export class CreateTrainRequest {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEnum(TrainType)
  type: TrainType;

  @IsInt()
  capacity: number;
}
