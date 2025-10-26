import { Prop, SchemaFactory,Schema} from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Role extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  roleId: string = uuidv4();

  @Prop({ default: '' })
  organization!: string;

  @Prop({ default: '' })
  roleName!: string;

  @Prop({ default: 0 })
  roleOrder!: number;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop({ default: '' })
  listPermission!: string;

  @Prop({ default: 0 })
  parentId!: number;

  @Prop({ default: '' })
  titleOrganization!: string;

  @Prop({ default: 0 })
  isEmployed!: number;
}
export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);