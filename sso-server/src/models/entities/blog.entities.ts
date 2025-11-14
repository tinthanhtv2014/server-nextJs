import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "../base/base.entities";
import { v4 as uuidv4 } from "uuid";

@Schema()
export class Blog extends BaseEntity {
  @Prop({ default: uuidv4, unique: true })
  blogId: string = uuidv4();

  @Prop({ default: "" })
  name!: string;

  @Prop({ default: "" })
  slug!: string;

  @Prop({ default: "" })
  content!: string;

  @Prop({ default: "" })
  image_url!: string;

  @Prop({ default: "" })
  meta_title!: string;

  @Prop({ default: "" })
  meta_slug!: string;

  @Prop({ type: [String], default: [] })
  meta_description!: string[];

  @Prop({ default: false })
  meta_keywords!: boolean;

  @Prop({ default: 0 })
  view_count!: number;

  @Prop({ default: "" })
  category!: string;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop({ default: false })
  status!: boolean;
}

export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
