import { Injectable } from "@nestjs/common";

import { BaseService } from "../helper/crud.service";
import { BlogDocument } from "../../models/entities/blog.entities";
import { BlogRepository } from "../../repository/blog/blog.respository";

import {
  Success,
  ProcessError,
  NotfoundError,
} from "../../shared/utils/response.util";
import {
  BlogCategoryDocument,
  BlogCategory,
} from "../../models/entities/blog-category.entities";
import { BlogCategoryRepository } from "../../repository/blog-category/blog-category.repository";
import { BlogCategoryDto } from "../../models/dto/blog-category/blog-category.dto";
@Injectable()
export class BlogCategoryService extends BaseService<BlogCategoryDocument> {
  constructor(private blogCategoryRepository: BlogCategoryRepository) {
    super(blogCategoryRepository);
  }

  async create(data: BlogCategoryDto): Promise<any | null> {
    const { data: existBlogs } = await super.getList({
      filter: {
        $or: [{ title: data.name }, { slug: data.slug }],
      },
    });

    if (existBlogs.length > 0) {
      return ProcessError("Title hoặc Slug đã tồn tại");
    }
    return super.create(data);
  }
  async update(
    key: keyof BlogCategory,
    value: any,
    data: BlogCategoryDto
  ): Promise<any | null> {
    if (key === "blogCategoryId") {
      const exist = await super.getList({
        filter: {
          name: data.name,
          slug: data.slug,
          blogCategoryId: { $ne: value },
        },
      });

      if (exist?.data?.length > 0) {
        return ProcessError("Title hoặc Slug đã tồn tại");
      }
    }

    const result = await super.update(key, value, data);

    return result;
  }
}
