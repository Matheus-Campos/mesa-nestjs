import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions, FindConditions } from 'typeorm';

import { FilterUsersDTO } from './dto/filter-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async findAll(filterUsersDto?: FilterUsersDTO) {
    const PER_PAGE_DEFAULT = 20;
    const where: FindConditions<User> = {};
    const filters: FindManyOptions<User> = {
      take: PER_PAGE_DEFAULT,
      skip: 0,
      where,
    };

    if (filterUsersDto.page) {
      filters.skip =
        (filterUsersDto.page - 1) *
        (filterUsersDto.perPage || PER_PAGE_DEFAULT);
    }

    if (filterUsersDto.perPage) {
      filters.take = filterUsersDto.perPage;
    }

    if (filterUsersDto.name) {
      where.name = Like(`%${filterUsersDto.name}%`);
    }

    const [users, count] = await this.usersRepository.findAndCount(filters);

    return {
      meta: {
        page: filters.skip / filters.take + 1,
        perPage: filters.take,
        count,
        lastPage: Math.ceil(count / filters.take),
      },
      data: users,
    };
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail(id);
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.softRemove({ id });
  }
}
