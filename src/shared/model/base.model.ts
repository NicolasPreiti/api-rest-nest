import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseModel<ID> {
  @PrimaryGeneratedColumn()
  public readonly id: ID;
}
