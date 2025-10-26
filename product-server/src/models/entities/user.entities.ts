import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../base/base.entities';
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class User extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  userId: string = uuidv4();

  @Prop({ unique: true, sparse: true, default: null })
  emailAddress?: string;

  @Prop({ required: true, unique: true })
  phoneNumber!: string;

  @Prop({ default: '' })
  firstName!: string;

  @Prop({ default: '' })
  lastName!: string;

  @Prop({ default: '' })
  fullName!: string;

  @Prop({ default: null })
  listAddress?: string;

  @Prop({ default: 0 })
  points!: number;

  @Prop({ default: 'active' })
  status!: string;

  @Prop({ default: '' })
  passwordHash!: string;

  @Prop({ type: [String], default: [] })
  listTenant!: string[];

  @Prop({ default: 0 })
  userUpdate!: number;

  @Prop({ default: 0 })
  userCreate!: number;

  @Prop({ default: '' })
  privateKey!: string;

  @Prop({ default: '' })
  defaultAddress!: string;

  @Prop({ default: 0 })
  defaultTenant!: number;

  @Prop({ default: 0 })
  defaultOrganization!: number;

  @Prop({ default: 0 })
  defaultStore!: number;

  @Prop({ default: 'PENDING' })
  rule!: string;

  @Prop()
  employed?: number;

  @Prop({ default: 0.0 })
  lat!: number;

  @Prop({ default: 0.0 })
  lng!: number;

  @Prop({ default: 0.0 })
  wallet!: number;

  @Prop({ default: 'chothongminh.com' })
  originSystem!: string;

  @Prop({ default: '' })
  avatar!: string;

  @Prop({ default: null })
  birthday?: Date;

  @Prop({ default: 0 })
  role!: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
