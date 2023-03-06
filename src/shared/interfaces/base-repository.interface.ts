import { BaseModel } from '../model/base.model';

export interface IBaseRepository<E extends BaseModel<ID>, ID> {
  existById(id: ID): Promise<boolean>;
  findAll(): Promise<E[]>;
  findById(id: ID): Promise<E | null>;
  save(entity: E): Promise<E>;
  update(existingEntity: E, entity: E): Promise<E>;
  delete(id: ID): Promise<void>;
}
