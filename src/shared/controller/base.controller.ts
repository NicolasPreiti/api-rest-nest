import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IBaseController } from '../interfaces/base-controller-interface';
import { BaseModel } from '../model/base.model';
import { BaseService } from '../service/base.service';
import { BaseRepository } from '../repository/base.repository';

export abstract class BaseController<
  E extends BaseModel<ID>,
  ID,
  R extends BaseRepository<E, ID>,
  S extends BaseService<E, ID, R>,
> implements IBaseController<E, ID>
{
  constructor(private service: S) {}

  @Get()
  public async getAll(): Promise<E[]> {
    const entities = await this.service.getAll();
    return entities;
  }

  @Get(':id')
  public async getById(@Param('id') id: ID): Promise<E> {
    const entity = await this.service.getById(id);
    return entity;
  }

  @Post()
  public async create(@Body() entity: E): Promise<E> {
    console.log(entity);
    entity = await this.service.create(entity);
    return entity;
  }

  @Put(':id')
  public async update(@Param('id') id: ID, @Body() entity: E): Promise<E> {
    entity = await this.service.update(id, entity);
    return entity;
  }

  @Delete(':id')
  public async delete(@Param('id') id: ID): Promise<void> {
    await this.service.delete(id);
  }
}
