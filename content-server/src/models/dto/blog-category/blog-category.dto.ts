import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class BlogCategoryDto {
  @ApiProperty({
    example: "Công nghệ",
    description: "Tên danh mục bài viết",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    example: "cong-nghe",
    description: "Slug (đường dẫn SEO thân thiện cho danh mục)",
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: "Tổng hợp các bài viết về công nghệ mới nhất.",
    description: "Mô tả ngắn gọn về danh mục",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: "Tin tức công nghệ mới nhất 2025",
    description: "Meta title cho SEO",
  })
  @IsOptional()
  @IsString()
  meta_title?: string;

  @ApiProperty({
    example: "Cập nhật nhanh chóng các xu hướng công nghệ mới nhất.",
    description: "Meta description cho SEO",
  })
  @IsOptional()
  @IsString()
  meta_description?: string;

  @ApiProperty({
    example: "công nghệ, tin tức, laptop",
    description: "Meta keywords cho SEO (cách nhau bởi dấu phẩy)",
  })
  @IsOptional()
  @IsString()
  meta_keywords?: string;

  @ApiProperty({
    example: "admin-1234",
    description: "Người cập nhật danh mục gần nhất",
  })
  @IsOptional()
  @IsString()
  userUpdate?: string;

  @ApiProperty({
    example: false,
    description: "Đã bị xóa hay chưa (soft delete)",
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
