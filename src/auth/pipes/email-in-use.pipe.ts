import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { User } from '../../users/persistence/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class EmailInUsePipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  async transform(value: User) {
    const exists = await this.usersService.existsByEmail(value.email);
    if (exists) throw new HttpException('Email in use', HttpStatus.BAD_REQUEST);
    return value;
  }
}
