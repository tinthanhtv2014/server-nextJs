// base.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } })
export class BaseEntity extends Document {

  @Prop({ default: () => new Date() })
  createDate!: Date;

  @Prop({ default: () => new Date() })
  updateDate!: Date;

  @Prop({ default: '' })
  createdBy?: string;

  @Prop({ default: '' })
  updatedBy?: string;

  @Prop({ default: false })
  isDeleted!: boolean;
  
}