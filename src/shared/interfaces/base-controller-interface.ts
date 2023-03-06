import { BaseModel } from '../model/base.model';

export interface IBaseController<E extends BaseModel<ID>, ID> {
  getAll(): Promise<E[]>;
  getById(id: ID): Promise<E>;
  create(entity: E): Promise<E>;
  update(id: ID, entity: E): Promise<E>;
  delete(id: ID): Promise<void>;
}
