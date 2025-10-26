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
  title!: string;

  @ApiProperty({
    example: "cach-build-laptop-gaming",
    description: "Slug (đường dẫn SEO thân thiện)",
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: "Hướng dẫn chi tiết cách build một chiếc laptop gaming mạnh mẽ...",
    description: "Nội dung bài viết",
  })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({
    example: "https://cdn.example.com/images/blog1.webp",
    description: "Ảnh đại diện bài viết",
  })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ example: "user-1234", description: "ID của tác giả" })
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty({
    example: ["Tech", "Laptop", "Gaming"],
    description: "Danh sách thẻ (tags) của bài viết",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    example: true,
    description: "Trạng thái đã xuất bản hay chưa",
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({ example: 150, description: "Số lượt xem bài viết" })
  @IsOptional()
  @IsNumber()
  views?: number;

  @ApiProperty({ example: "Tin công nghệ", description: "Danh mục bài viết" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    example: false,
    description: "Đã bị xóa hay chưa (soft delete)",
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
