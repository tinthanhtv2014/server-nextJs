import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../../models/entities/user.entities";
import { BaseRepository } from "../base.respository";

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel("User") private readonly userModel: Model<UserDocument>) {
    super(userModel);
  }
}
