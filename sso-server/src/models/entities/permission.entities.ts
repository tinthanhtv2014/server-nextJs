import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from "uuid";
import { Document } from "mongoose"; // ✅ THÊM DÒNG NÀY
@Schema()
export class Permission extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  permissionId: string = uuidv4();

  // 🔗 Lưu roleId để biết permission này thuộc role nào
  @Prop({ required: true })
  roleId!: string;

  // Tên quyền (ví dụ: "CREATE_USER", "EDIT_PRODUCT")
  @Prop({ default: "" })
  permissionName!: string;

  // Mô tả quyền (optional)
  @Prop({ default: "" })
  description!: string;

  // Đánh dấu đã xoá chưa
  @Prop({ default: false })
  isDeleted!: boolean;
}

export type PermissionDocument = Permission & Document;
export const PermissionSchema = SchemaFactory.createForClass(Permission);
