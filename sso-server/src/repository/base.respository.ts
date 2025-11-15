// src/repositories/base.repository.ts
import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { Injectable } from "@nestjs/common";

export interface IBaseRepository<T extends Document> {
  getMany(
    filter?: FilterQuery<T>,
    projection?: any,
    options?: { sort?: any; skip?: number; limit?: number }
  ): Promise<{ data: any; total: number }>;
  getOne(filter: FilterQuery<T>, projection?: any): Promise<T | null>;
  getById(id: string): Promise<T | null>;
  create(data: Partial<T>, uniqueFilter?: FilterQuery<T>): Promise<T | null>;
  count(filter?: FilterQuery<T>): Promise<number>;

  update(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null>;
  softDelete(filter: FilterQuery<T>): Promise<T | null>;
  delete(filter: FilterQuery<T>): Promise<{ deletedCount?: number }>;
}

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  public async getMany(
    filter: FilterQuery<T> = {},
    projection: any = null,
    options: { sort?: any; skip?: number; limit?: number } = {}
  ): Promise<{ data: any; total: number }> {
    // <-- LeanDocument<T>[] thay vì T[]
    const { sort, skip, limit } = options;

    const [data, total] = await Promise.all([
      this.model
        .find({ ...filter, isDeleted: false }, projection)
        .skip(skip || 0)
        .limit(limit || 0)
        .sort(sort)
        .lean<Document<T>>() // <-- thêm generic cho lean
        .exec(),
      this.model.countDocuments({ ...filter, isDeleted: false }).exec(),
    ]);

    return { data, total };
  }
  public async getOne(
    filter: FilterQuery<T>,
    projection: any = null
  ): Promise<T | null> {
    return this.model
      .findOne({ ...filter, isDeleted: false }, projection)
      .lean<T>()
      .exec();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id, isDeleted: false }).exec();
  }

  public async create(
    data: Partial<T>,
    uniqueFilter?: FilterQuery<T>
  ): Promise<T | null> {
    if (uniqueFilter) {
      const exists = await this.model.findOne(uniqueFilter).exec();
      if (exists) return null;
    }
    const doc = new this.model(data);
    return doc.save();
  }

  // public async update(id: string, data: Partial<T>): Promise<T | null> {
  //     return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  // }

  public async update(
    filter: FilterQuery<T>,
    data: Partial<T>
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, data, { new: true }).exec();
  }

  public async softDelete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(filter, { isDeleted: true }, { new: true })
      .exec();
  }

  public async delete(
    filter: FilterQuery<T>
  ): Promise<{ deletedCount?: number }> {
    const result = await this.model.deleteOne(filter).exec();
    return { deletedCount: result.deletedCount };
  }

  public async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments({ ...filter, isDeleted: false }).exec();
  }
}
