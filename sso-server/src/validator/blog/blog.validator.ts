import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog } from "../../models/entities/blog.entities";
import { ProcessError, ConflictError } from "../../shared/utils/response.util";
import { BaseValidator } from "../base.validator";

@Injectable()
export class BlogValidator extends BaseValidator {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {
    super();
  }

  async validateCreate(dto: any) {

    const checkTitle =
      this.required(dto.title, "title") ||
      this.isString(dto.title, "title") ||
      this.minLength(dto.title, "title", 3);
    if (checkTitle) return checkTitle;

    const checkSlug =
      this.required(dto.slug, "slug") ||
      this.isString(dto.slug, "slug") ||
      this.isSlug(dto.slug, "slug");
    if (checkSlug) return checkSlug;

    return null;
  }

  async validateUpdate(id: string, dto: any) {
    const checkTitle =
      this.required(dto.title, "title") || this.isString(dto.title, "title");
    if (checkTitle) return checkTitle;

    const checkSlug =
      this.required(dto.slug, "slug") || this.isString(dto.slug, "slug");
    if (checkSlug) return checkSlug;

    return null;
  }
}
