import { Controller, Body, Post, Put, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { BaseCrud } from "../base/crud.controller";
import { BlogService } from "../../services/admin/blog.service";
import { BlogDto } from "../../models/dto/blog/blog.dto";
import { BlogValidator } from "../../validator/blog/blog.validator";
import { ProcessError } from "../../shared/utils/response.util";

@ApiTags("Blogs")
@Controller("blogs")
export class BlogController extends BaseCrud<BlogService>(
  "blogId",
  BlogDto,
  BlogDto
) {
  constructor(
    private readonly blogService: BlogService,
    private readonly blogValidator: BlogValidator
  ) {
    super(blogService);
  }

  @Post("create")
  @ApiOperation({ summary: "Tạo blog mới (có validate)" })
  @ApiBody({ type: BlogDto })
  async create(@Body() body: any) {
    console.log("🧩 BlogController.create override:", body);

    const validationError = await this.blogValidator.validateCreate(body);
    if (validationError) return validationError;

    const result = await this.blogService.create(body);
    return result;
  }

  @Put("update/:blogId")
  @ApiOperation({ summary: "Cập nhật blog (có validate)" })
  @ApiBody({ type: BlogDto })
  async update(@Param("blogId") blogId: string, @Body() body: any) {
    console.log("🧩 BlogController.update override:", { blogId, body });

    const validationError = await this.blogValidator.validateUpdate(
      blogId,
      body
    );
    if (validationError) return validationError;

    const result = await this.blogService.update("blogId", blogId, body);
    return result;
  }
}
