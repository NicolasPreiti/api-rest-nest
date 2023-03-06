import { HttpException, HttpStatus } from '@nestjs/common';
import { IBaseService } from '../interfaces/base-service.interface';
import { BaseModel } from '../model/base.model';
import { BaseRepository } from '../repository/base.repository';

export abstract class BaseService<
  E extends BaseModel<ID>,
  ID,
  R extends BaseRepository<E, ID>,
> implements IBaseService<E, ID>
{
  constructor(protected repository: R) {}

  public async getAll(): Promise<E[]> {
    const entities = await this.repository.findAll();

    if (entities.length === 0)
      throw new HttpException('Entities not found', HttpStatus.NOT_FOUND);
    return entities;
  }

  public async getById(id: ID): Promise<E> {
    const entity = await this.repository.findById(id);

    if (entity === null)
      throw new HttpException(`Entity ${id} not found`, HttpStatus.NOT_FOUND);

    return entity;
  }
  public async create(entity: E): Promise<E> {
    entity = await this.repository.save(entity);
    return entity;
  }
  public async update(id: ID, entity: E): Promise<E> {
    const existingEntity = await this.getById(id);

    entity = await this.repository.update(existingEntity, entity);
    return entity;
  }
  public async delete(id: ID): Promise<void> {
    await this.getById(id);

    await this.repository.delete(id);
    return;
  }
}
