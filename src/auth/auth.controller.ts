import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { User } from '../users/persistence/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ILoginInput } from './interfaces/login-input.interface';
import { EmailInUsePipe } from './pipes/email-in-use.pipe';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(
    private service: AuthService,
    private usersService: UsersService,
  ) {}

  @UsePipes(EmailInUsePipe)
  @Post('/register')
  public async register(@Body() entity: User) {
    entity = await this.usersService.createCustomer(entity);
    return entity;
  }

  @Post('/login')
  public async login(@Body() userLogin: ILoginInput) {
    const user = await this.service.validateUser(userLogin);
    const token = await this.service.generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }
}
