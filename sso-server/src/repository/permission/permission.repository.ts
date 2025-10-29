import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "../base.respository";
import {
  Permission,
  PermissionDocument,
} from "../../models/entities/permission.entities";

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionDocument> {
  constructor(
    @InjectModel(Permission.name)
    protected readonly permissionModel: Model<PermissionDocument>
  ) {
    super(permissionModel);
  }
}
