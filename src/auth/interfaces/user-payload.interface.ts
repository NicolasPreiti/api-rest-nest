import { User } from '../../users/persistence/user.entity';

export type IUserPayload = Pick<User, 'id' | 'role'>;
