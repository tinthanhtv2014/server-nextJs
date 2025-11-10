import { Controller, Body, Post, Put, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { BaseCrud } from "../base/crud.controller";

import { ProcessError } from "../../shared/utils/response.util";
import { BlogCategoryService } from "../../services/admin/blog-category.service";
import { BlogCategoryDto } from "../../models/dto/blog-category/blog-category.dto";
import { BlogCategoryValidator } from "../../validator/blog-category.validator.ts/blog-category.validator";

@ApiTags("BlogCategories")
@Controller("blogCategories")
export class BlogCategoryController extends BaseCrud<BlogCategoryService>(
  "blogCategoryId",
  BlogCategoryDto,
  BlogCategoryDto
) {
  constructor(
    private readonly blogCategoryService: BlogCategoryService,
    private readonly blogCategoryValidator: BlogCategoryValidator
  ) {
    super(blogCategoryService);
  }

  @Post("create")
  @ApiOperation({ summary: "Tạo blog category mới (có validate)" })
  @ApiBody({ type: BlogCategoryDto })
  async create(@Body() body: any) {
    console.log("🧩 BlogController.create override:", body);

    const validationError = await this.blogCategoryValidator.validateCreate(
      body
    );
    if (validationError) return validationError;

    const result = await this.blogCategoryService.create(body);
    return result;
  }

  @Put("update/:blogCategoryId")
  @ApiOperation({ summary: "Cập nhật blog category (có validate)" })
  @ApiBody({ type: BlogCategoryDto })
  async update(
    @Param("blogCategoryId") blogCategoryId: string,
    @Body() body: any
  ) {
    console.log("🧩 BlogController.update override:", { blogCategoryId, body });

    const validationError = await this.blogCategoryValidator.validateUpdate(
      blogCategoryId,
      body
    );
    if (validationError) return validationError;

    const result = await this.blogCategoryService.update(
      "blogCategoryId",
      blogCategoryId,
      body
    );
    return result;
  }
}
