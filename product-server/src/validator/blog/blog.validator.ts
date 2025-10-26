import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog } from "../../models/entities/blog.entities";
import {
  Success,
  ProcessError,
  NotfoundError,
  ConflictError,
} from "../../shared/utils/response.util";
@Injectable()
export class BlogValidator {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>
  ) {}

  // ✅ Hàm kiểm tra title trùng
  async validateCreate(dto: any) {
    console.log("✅ Đang chạy validateCreate với data:", dto); // 👈 test nè bro
    if (!dto.title || dto.title.trim() === "") {
      return ProcessError("Thiếu title");
    }

    if (!dto.slug || dto.slug.trim() === "") {
      return ProcessError("Thiếu Slug");
    }

    const exist = await this.blogModel.findOne({ title: dto.title });
    if (exist) {
      return ConflictError();
    }
    return null; // ✅ không lỗi
  }

  // (Optional) Kiểm tra update
  async validateUpdate(id: string, dto: any) {
    const exist = await this.blogModel.findOne({
      title: dto.title,
      slug: dto.slug,
      blogId: { $ne: id },
    });
    if (exist) {
      return ConflictError();
    }
    return null; // ✅ không lỗi
  }
}
