import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "../../../controller/private/role.controller";
import { Role, RoleSchema } from "../../../models/entities/role.entities";
import { RoleService } from "../../../services/admin/role.service";
import { RoleRepository } from "../../../repository/role/role.respository";
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
export class BlogModule {}
