import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../shared/repository/base.repository';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends BaseRepository<User, number> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public async existByEmail(email: string): Promise<boolean> {
    const exists = await this.repository.exist({ where: { email } });
    return exists;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user;
  }
}
