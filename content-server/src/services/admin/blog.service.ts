import { Injectable } from "@nestjs/common";

import { BaseService } from "../helper/crud.service";
import { BlogDocument } from "../../models/entities/blog.entities";
import { BlogRepository } from "../../repository/blog/blog.respository";

import { BlogDto } from "../../models/dto/blog/blog.dto";
import { Blog } from "../../models/entities/blog.entities";
import {
  Success,
  ProcessError,
  NotfoundError,
} from "../../shared/utils/response.util";
@Injectable()
export class BlogService extends BaseService<BlogDocument> {
  constructor(private blogRepository: BlogRepository) {
    super(blogRepository);
  }

  async create(data: BlogDto): Promise<any | null> {
    const { data: existBlogs } = await super.getList({
      filter: {
        $or: [{ title: data.title }, { slug: data.slug }],
      },
    });

    if (existBlogs.length > 0) {
      return ProcessError("Title hoặc Slug đã tồn tại");
    }
    return super.create(data);
  }
  async update(
    key: keyof Blog,
    value: any,
    data: BlogDto
  ): Promise<any | null> {
    if (key === "blogId") {
      // ✅ Tìm xem có blog nào khác có cùng title & slug không
      const exist = await super.getList({
        filter: {
          title: data.title,
          slug: data.slug,
          blogId: { $ne: value }, // loại trừ blog hiện tại
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
