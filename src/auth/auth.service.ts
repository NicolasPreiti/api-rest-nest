import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/persistence/users.repository';
import { ILoginInput } from './interfaces/login-input.interface';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './interfaces/user-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  public async validateUser(userLogin: ILoginInput) {
    const user = await this.usersRepository.findByEmail(userLogin.email);

    const match =
      user !== null ? await compare(userLogin.password, user.password) : false;

    if (match === false || user === null)
      throw new HttpException(
        'Email or password are incorrect',
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }

  public async generateToken(payload: IUserPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: 'hotdog',
    });

    return token;
  }
}
