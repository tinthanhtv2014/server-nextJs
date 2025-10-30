import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class RoleDto {
  @ApiProperty({ example: "Company A", description: "Tên tổ chức" })
  @IsOptional()
  @IsString()
  organization?: string;

  @ApiProperty({ example: "Admin", description: "Tên vai trò" })
  @IsNotEmpty()
  @IsString()
  roleName!: string;

  @ApiProperty({ example: 1, description: "Thứ tự vai trò" })
  @IsOptional()
  @IsNumber()
  roleOrder?: number;

  @ApiProperty({ example: false, description: "Đã bị xóa hay chưa" })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    example: "USER_CREATE,USER_UPDATE,USER_DELETE",
    description: "Danh sách quyền (chuỗi, phân tách bằng dấu phẩy)",
  })
  @IsOptional()
  @IsString()
  system?: string;

  @ApiProperty({ example: 0, description: "ID vai trò cha (nếu có)" })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({
    example: "Chi nhánh HCM",
    description: "Tên tổ chức hiển thị",
  })
  @IsOptional()
  @IsString()
  titleOrganization?: string;

  @ApiProperty({ example: 0, description: "Số lượng nhân viên thuộc vai trò" })
  @IsOptional()
  @IsNumber()
  isEmployed?: number;
}
