import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from "uuid";

@Schema()
export class Blog extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  blogId: string = uuidv4();

  @Prop({ default: "" })
  title!: string;

  @Prop({ default: "" })
  slug!: string;

  @Prop({ default: "" })
  content!: string;

  @Prop({ default: "" })
  thumbnail!: string;

  @Prop({ default: "" })
  authorId!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ default: false })
  isPublished!: boolean;

  @Prop({ default: 0 })
  views!: number;

  @Prop({ default: "" })
  blogCategoryId!: string;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
