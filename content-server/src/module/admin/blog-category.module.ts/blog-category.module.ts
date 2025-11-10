import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  BlogCategory,
  BlogCategorySchema,
} from "../../../models/entities/blog-category.entities";
import { BlogCategoryController } from "../../../controller/private/blog-category.controller";
import { BlogCategoryService } from "../../../services/admin/blog-category.service";
import { BlogCategoryRepository } from "../../../repository/blog-category/blog-category.repository";
import { BlogCategoryValidator } from "../../../validator/blog-category.validator.ts/blog-category.validator";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogCategory.name, schema: BlogCategorySchema },
    ]),
  ],
  controllers: [BlogCategoryController],
  providers: [
    BlogCategoryService,
    BlogCategoryRepository,
    BlogCategoryValidator,
  ],
})
export class BlogCategoryModule {}
