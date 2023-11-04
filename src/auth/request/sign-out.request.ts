import { IsString } from 'class-validator';

export class SignOutRequest {
  @IsString()
  refresh_token: string;
}
