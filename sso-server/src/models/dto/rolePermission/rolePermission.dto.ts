import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";

export class RolePermissionDto {
  @ApiProperty({
    example: "READ_PRODUCT",
    description: "Id",
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  permissionIds!: string[];

  @ApiProperty({
    example: "Cho phép xem danh sách sản phẩm",
    description: "Mô tả chi tiết về quyền này",
  })
  @IsOptional()
  @IsString()
  roleId?: string;
}
