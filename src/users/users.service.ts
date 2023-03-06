import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/service/base.service';
import { User } from './persistence/user.entity';
import { UsersRepository } from './persistence/users.repository';
import { hash } from 'bcrypt';
import { Role } from './enum/role.enum';

@Injectable()
export class UsersService extends BaseService<User, number, UsersRepository> {
  constructor(repository: UsersRepository) {
    super(repository);
  }

  public async createCustomer(entity: User): Promise<User> {
    const hashedPassword = await hash(entity.password, 10);
    entity.password = hashedPassword;
    entity.role = Role.CUSTOMER;

    entity = await this.repository.save(entity);
    return entity;
  }

  public async createAdmin(entity: User): Promise<User> {
    const hashedPassword = await hash(entity.password, 10);
    entity.password = hashedPassword;
    entity.role = Role.ADMIN;

    entity = await this.repository.save(entity);
    return entity;
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const exists = await this.repository.existByEmail(email);
    return exists;
  }
}
