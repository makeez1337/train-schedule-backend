import { IsString, MinLength } from 'class-validator';

export class CreateStationRequest {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  city: string;
}
