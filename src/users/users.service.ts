import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserRequest } from './request/create-user.request';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async create(createUserRequest: CreateUserRequest): Promise<void> {
    const userEntity = await this.usersRepository.create(createUserRequest);
    await this.usersRepository.save(userEntity);
  }

  public async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }
}
