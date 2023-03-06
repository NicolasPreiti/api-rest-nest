import { Controller } from '@nestjs/common';
import { BaseController } from '../shared/controller/base.controller';
import { User } from './persistence/user.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersRepository } from './persistence/users.repository';

@ApiTags('users')
@Controller('users')
export class UsersController extends BaseController<
  User,
  number,
  UsersRepository,
  UsersService
> {
  constructor(service: UsersService) {
    super(service);
  }
}
