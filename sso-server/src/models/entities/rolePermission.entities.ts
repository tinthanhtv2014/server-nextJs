import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from "uuid";
import { Document } from "mongoose"; // ✅ THÊM DÒNG NÀY
@Schema()
export class rolePermission extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  rolePermissionId: string = uuidv4();

  @Prop({ default: "" })
  permissionId!: string;

  @Prop({ default: "" })
  roleId!: string;
}

export type rolePermissionDocument = rolePermission & Document;
export const rolePermissionSchema =
  SchemaFactory.createForClass(rolePermission);
