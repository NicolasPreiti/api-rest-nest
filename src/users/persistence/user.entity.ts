import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../shared/model/base.model';
import { Role } from '../enum/role.enum';

@Entity({ name: 'users' })
export class User extends BaseModel<number> {
  @Column({ nullable: false })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public lastname: string;

  @Column({ nullable: false })
  public role: Role;
}
