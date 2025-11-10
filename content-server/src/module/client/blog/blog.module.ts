import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Blog, BlogSchema } from "../../../models/entities/blog.entities";
import { BlogController } from "../../../controller/private/blog.controller";
import { BlogService } from "../../../services/admin/blog.service";
import { BlogRepository } from "../../../repository/blog/blog.respository";
import { BlogValidator } from "../../../validator/blog/blog.validator";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, BlogValidator],
})
export class ClientBlogModule {}
