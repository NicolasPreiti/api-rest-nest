import { User } from '../../users/persistence/user.entity';

export type ILoginInput = Pick<User, 'email' | 'password'>;
