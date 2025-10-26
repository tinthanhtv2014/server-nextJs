import { Injectable } from "@nestjs/common";
import { Document, FilterQuery } from "mongoose";
import { IBaseRepository } from "../../repository/base.respository";

export interface IBaseService<T extends Document> {
  getList(query?: any): Promise<{ data: any; total: number }>;
  findOne(key: keyof T, value: any): Promise<T | null>;
  create(data: Partial<T>): Promise<T | null>;
  update(key: keyof T, value: any, data: Partial<T>): Promise<T | null>;
  softDelete(key: keyof T, value: any): Promise<T | null>;
  delete(key: keyof T, value: any): Promise<{ deletedCount?: number }>;
}

@Injectable()
export class BaseService<T extends Document> implements IBaseService<T> {
  constructor(protected readonly repository: IBaseRepository<T>) {}

  async getList(query?: {
    filter?: FilterQuery<T>;
    sort?: any;
    skip?: number;
    limit?: number;
  }): Promise<{ data: any; total: number }> {
    const data = this.repository.getMany(query?.filter, null, {
      sort: query?.sort,
      skip: query?.skip,
      limit: query?.limit,
    });
    return data;
  }

  async findOne(key: keyof T, value: any): Promise<T | null> {
    return this.repository.getOne({ [key]: value } as FilterQuery<T>);
  }

  async create(data: Partial<T>): Promise<T | null> {
    return this.repository.create(data);
  }

  async update(key: keyof T, value: any, data: Partial<T>): Promise<T | null> {
    return this.repository.update({ [key]: value } as FilterQuery<T>, data);
  }

  async softDelete(key: keyof T, value: any): Promise<T | null> {
    return this.repository.softDelete({ [key]: value } as FilterQuery<T>);
  }

  async delete(key: keyof T, value: any): Promise<{ deletedCount?: number }> {
    return this.repository.delete({ [key]: value } as FilterQuery<T>);
  }
}
