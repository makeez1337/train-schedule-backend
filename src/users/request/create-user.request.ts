import { IsString, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
