import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from "uuid";
@Schema()
export class User extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  userId: string = uuidv4();

  @Prop({ unique: true, sparse: true, default: null })
  emailAddress?: string;

  @Prop({ required: true, unique: true })
  phoneNumber!: string;

  @Prop({ default: "" })
  fullName!: string;

  @Prop({ default: null })
  address?: string;

  @Prop({ default: 0 })
  points!: number;

  @Prop({ default: "active" })
  status!: string;

  @Prop({ default: "" })
  passwordHash!: string;

  @Prop({ default: "" })
  privateKey!: string;

  @Prop({ default: "" })
  defaultAddress!: string;

  @Prop()
  employed?: number;

  @Prop({ default: 0.0 })
  lat!: number;

  @Prop({ default: 0.0 })
  lng!: number;

  @Prop({ default: "" })
  avatar!: string;

  @Prop({ default: null })
  birthday?: Date;

  @Prop({ default: 0 })
  roleId!: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
