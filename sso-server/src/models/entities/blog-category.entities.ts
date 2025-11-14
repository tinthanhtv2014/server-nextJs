import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from "uuid";

@Schema()
export class BlogCategory extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  blogCategoryId: string = uuidv4();

  @Prop({ required: true, default: "" })
  name!: string;

  @Prop({ required: true, default: "" })
  slug!: string;

  @Prop({ default: "" })
  description!: string;

  @Prop({ default: "" })
  meta_title!: string;

  @Prop({ default: "" })
  meta_description!: string;

  @Prop({ default: "" })
  meta_keywords!: string;

  @Prop({ default: "" })
  userUpdate!: string;

  @Prop({ default: false })
  isDeleted!: boolean;
}

export type BlogCategoryDocument = BlogCategory & Document;
export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);
