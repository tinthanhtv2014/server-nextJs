import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "../base.respository";
import {
  BlogCategory,
  BlogCategoryDocument,
} from "../../models/entities/blog-category.entities";

@Injectable()
export class BlogCategoryRepository extends BaseRepository<BlogCategoryDocument> {
  constructor(
    @InjectModel(BlogCategory.name)
    protected readonly blogCategoryModel: Model<BlogCategoryDocument>
  ) {
    super(blogCategoryModel);
  }
}
