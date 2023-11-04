import { IsNumberString } from 'class-validator';

export class OperationByIdParam {
  @IsNumberString()
  id: string;
}
