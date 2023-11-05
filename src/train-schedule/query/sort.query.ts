import { IsEnum, IsOptional } from 'class-validator';

import { SortEnum } from '../enums/sort.enum';

export class SortQuery {
  @IsOptional()
  @IsEnum(SortEnum)
  arrive_time?: SortEnum;
}
