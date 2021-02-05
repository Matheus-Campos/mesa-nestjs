import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Repository,
  createConnection,
  getConnection,
  getRepository,
} from 'typeorm';
import { UsersService } from './users.service';

import { FilterUsersDTO } from './dto/filter-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  const createUserDto: CreateUserDto = {
    name: 'Matheus Campos',
    password: '123123',
    passwordConfirmation: '123123',
    phone: '+5581999999999',
  };

  const updateUserDto: UpdateUserDto = {
    name: 'Nome teste',
  };

  const testConnectionName = 'testConnectionName';

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      logging: false,
      entities: [User],
      name: testConnectionName,
    });

    usersRepository = getRepository(User, testConnectionName);
    service = new UsersService(usersRepository);

    return connection;
  });

  afterEach(async () => {
    return getConnection(testConnectionName).close();
  });

  it('should create a user', async () => {
    const user = await service.create(createUserDto);

    const safeCreateUserDto = Object.assign({}, createUserDto);
    delete safeCreateUserDto.passwordConfirmation;

    expect(user).toBeTruthy();
    expect(user).toHaveProperty('id');
    expect(user).toMatchObject(safeCreateUserDto);
    expect(user.createdAt).toBeTruthy();
    expect(user.updatedAt).toBeTruthy();
    expect(user.deletedAt).toBeNull();

    const result = await usersRepository.findOne(user.id);
    expect(user).toEqual(result);
  });

  it('should find a user', async () => {
    let user = usersRepository.create(createUserDto);
    user = await usersRepository.save(user);

    const userRetrieved = await service.findOne(user.id);

    expect(userRetrieved).toEqual(user);
  });

  it('should remove a user', async () => {
    let user = await usersRepository.create(createUserDto);
    user = await usersRepository.save(user);

    await service.remove(user.id);
    const userRetrieved = await usersRepository.findOne(user.id);
    expect(userRetrieved).toBeUndefined();
  });

  it('should update a user', async () => {
    let user = await usersRepository.create(createUserDto);
    user = await usersRepository.save(user);

    const userUpdated = await service.update(user.id, updateUserDto);
    expect(userUpdated).toBeDefined();
    expect(userUpdated).toMatchObject(updateUserDto);
  });

  it('should find all users (paginated)', async () => {
    const filterUsersDto: FilterUsersDTO = {
      page: 1,
      perPage: 1,
    };
    const newCreateUserDto: CreateUserDto = {
      name: 'Emilio',
      password: '123123',
      passwordConfirmation: '123123',
      phone: '+5581988888888',
    };
    await usersRepository.insert(createUserDto);
    await usersRepository.insert(newCreateUserDto);

    const result = await service.findAll(filterUsersDto);

    expect(result).toHaveProperty('meta');
    expect(result).toHaveProperty('data');
    expect(result.meta).toEqual({
      page: filterUsersDto.page,
      count: 2,
      lastPage: 2,
      perPage: filterUsersDto.perPage,
    });
    expect(result.data).toHaveLength(filterUsersDto.perPage);
    expect(
      result.data.every((user) =>
        [newCreateUserDto.name, createUserDto.name].includes(user.name),
      ),
    ).toBeTruthy();
  });

  it('should find all users by name', async () => {
    const filterUsersDto: FilterUsersDTO = {
      page: 1,
      perPage: 1,
      name: createUserDto.name,
    };

    await usersRepository.insert(createUserDto);

    const result = await service.findAll(filterUsersDto);

    expect(result).toHaveProperty('meta');
    expect(result).toHaveProperty('data');
    expect(result.meta).toEqual({
      page: filterUsersDto.page,
      perPage: filterUsersDto.perPage,
      lastPage: 1,
      count: 1,
    });
  });
});
