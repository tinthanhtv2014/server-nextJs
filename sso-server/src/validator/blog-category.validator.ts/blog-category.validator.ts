import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogCategory } from "../../models/entities/blog-category.entities";
import { ProcessError, ConflictError } from "../../shared/utils/response.util";
import { BaseValidator } from "../base.validator";

@Injectable()
export class BlogCategoryValidator extends BaseValidator {
  constructor(
    @InjectModel(BlogCategory.name)
    private readonly blogCategoryModel: Model<BlogCategory>
  ) {
    super();
  }

  async validateCreate(dto: any) {
    console.log("✅ Đang chạy validateCreate với data:", dto);

    const checkName =
      this.required(dto.name, "name") ||
      this.isString(dto.name, "name") ||
      this.minLength(dto.name, "name", 3);
    if (checkName) return checkName;

    const checkSlug =
      this.required(dto.slug, "slug") ||
      this.isString(dto.slug, "slug") ||
      this.isSlug(dto.slug, "slug");
    if (checkSlug) return checkSlug;

    return null;
  }

  async validateUpdate(id: string, dto: any) {
    const checkName =
      this.required(dto.name, "name") || this.isString(dto.name, "name");
    if (checkName) return checkName;

    const checkSlug =
      this.required(dto.slug, "slug") || this.isString(dto.slug, "slug");
    if (checkSlug) return checkSlug;

    return null;
  }
}
