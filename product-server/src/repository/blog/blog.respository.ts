import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "../base.respository";
import { Blog, BlogDocument } from "../../models/entities/blog.entities";

@Injectable()
export class BlogRepository extends BaseRepository<BlogDocument> {
  constructor(
    @InjectModel(Blog.name) protected readonly blogModel: Model<BlogDocument>
  ) {
    super(blogModel);
  }
}
