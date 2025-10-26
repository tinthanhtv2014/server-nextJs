import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseCrud } from "../base/crud.controller";

import { BlogService } from "../../services/admin/blog.service";
import { BlogDto } from "../../models/dto/blog/blog.dto";

@ApiTags("Blogs")
@Controller("blogs")
export class BlogController extends BaseCrud<BlogService>(
  "blogId",
  BlogDto,
  BlogDto
) {
  constructor(private readonly blogService: BlogService) {
    super(blogService);
  }
}
