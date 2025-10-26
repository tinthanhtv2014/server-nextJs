import { Injectable } from "@nestjs/common";

import { BaseService } from "../helper/crud.service";
import { BlogDocument } from "../../models/entities/blog.entities";
import { BlogRepository } from "../../repository/blog/blog.respository";
import { BlogValidator } from "../../validator/blog/blog.validator";
import { BlogDto } from "../../models/dto/blog/blog.dto";
import { Blog } from "../../models/entities/blog.entities";
import {
  Success,
  ProcessError,
  NotfoundError,
} from "../../shared/utils/response.util";
@Injectable()
export class BlogService extends BaseService<BlogDocument> {
  constructor(
    private blogRepository: BlogRepository,
    private readonly blogValidator: BlogValidator
  ) {
    super(blogRepository);
  }

  async create(data: BlogDto): Promise<any | null> {
    const validation = await this.blogValidator.validateCreate(data);
    if (validation) return validation; // ⛔ có lỗi thì return luôn ProcessError()

    return super.create(data);
  }
  async update(
    key: keyof Blog,
    value: any,
    data: BlogDto
  ): Promise<any | null> {
    if (key === "blogId") {
      const validation = await this.blogValidator.validateUpdate(value, data);
      if (validation) return validation;
    }

    const result = await super.update(key, value, data);

    return result;
  }
}
