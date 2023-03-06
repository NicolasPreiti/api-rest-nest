import { FindOptionsWhere, Repository } from 'typeorm';
import { IBaseRepository } from '../interfaces/base-repository.interface';
import { BaseModel } from '../model/base.model';

export abstract class BaseRepository<E extends BaseModel<ID>, ID>
  implements IBaseRepository<E, ID>
{
  constructor(protected repository: Repository<E>) {}

  public async existById(id: ID): Promise<boolean> {
    const exist = await this.repository.exist({
      where: { id } as FindOptionsWhere<E>,
    });
    return exist;
  }

  public async findAll(): Promise<E[] | []> {
    const entities = await this.repository.find();
    return entities;
  }

  public async findById(id: ID): Promise<E | null> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<E>);

    return entity;
  }

  public async save(entity: E): Promise<E> {
    entity = await this.repository.save(entity);
    return entity;
  }

  public async update(existingEntity: E, entity: E): Promise<E> {
    const updates = Object.assign(existingEntity, entity);
    entity = await this.repository.save(updates);
    return entity;
  }

  public async delete(id: ID): Promise<void> {
    await this.repository.delete(id as string);
    return;
  }
}
