import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class PermissionDto {
  @ApiProperty({
    example: "READ_PRODUCT",
    description: "Tên quyền (permission) – mô tả hành động hoặc chức năng",
  })
  @IsNotEmpty()
  @IsString()
  permissionName!: string;

  @ApiProperty({
    example: "Cho phép xem danh sách sản phẩm",
    description: "Mô tả chi tiết về quyền này",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: "role-1234",
    description: "ID của role mà quyền này thuộc về",
  })
  @IsNotEmpty()
  @IsString()
  roleId!: string;

  @ApiProperty({
    example: false,
    description: "Trạng thái đã bị xóa hay chưa (soft delete)",
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
