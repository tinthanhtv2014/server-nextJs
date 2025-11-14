import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsNumber,
} from "class-validator";

export class BlogDto {
  @ApiProperty({
    example: "Cách build laptop gaming",
    description: "Tiêu đề bài viết",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    example: "cach-build-laptop-gaming",
    description: "Slug SEO, nếu không gửi sẽ tự generate từ name",
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: "Hướng dẫn chi tiết cách build laptop gaming mạnh mẽ...",
    description: "Nội dung bài viết",
  })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({
    example: "Hướng dẫn build laptop gaming cho người mới",
    description: "Mô tả ngắn cho bài viết",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: "Build laptop gaming mạnh nhất 2025",
    description: "Meta title cho SEO",
  })
  @IsOptional()
  @IsString()
  meta_title?: string;

  @ApiProperty({
    example: "Hướng dẫn từng bước để build một laptop gaming hiệu năng cao.",
    description: "Meta description cho SEO",
  })
  @IsOptional()
  @IsString()
  meta_description?: string;

  @ApiProperty({
    example: "laptop, build laptop, gaming",
    description: "Meta keywords cho SEO, ngăn cách bằng dấu phẩy",
  })
  @IsOptional()
  @IsString()
  meta_keywords?: string;

  @ApiProperty({
    example: "b3a9d391-df1a-43ce-9e63-91f0e21c77a0",
    description: "ID danh mục bài viết (blogCategoryId)",
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({
    example: "user123",
    description: "Người cập nhật bài viết",
  })
  @IsOptional()
  @IsString()
  userUpdate?: string;

  @ApiProperty({
    example: false,
    description: "Trạng thái xóa mềm",
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Ảnh đại diện bài viết",
  })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({
    example: ["laptop", "gaming", "build"],
    description: "Danh sách tag",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    example: 150,
    description: "Số lượt xem",
  })
  @IsOptional()
  @IsNumber()
  views?: number;
}
