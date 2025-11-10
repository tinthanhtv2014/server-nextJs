import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "../base.respository";
import {
  rolePermission,
  rolePermissionDocument,
} from "../../models/entities/rolePermission.entities";

@Injectable()
export class RolePermissionRepository extends BaseRepository<rolePermissionDocument> {
  constructor(
    @InjectModel(rolePermission.name)
    protected readonly rolePermissionModel: Model<rolePermissionDocument>
  ) {
    super(rolePermissionModel);
  }

  async insertMany(
    data: Partial<rolePermission>[]
  ): Promise<rolePermissionDocument[]> {
    if (!data || data.length === 0) return [];
    return await this.rolePermissionModel.insertMany(data, { ordered: false });
  }
  async deleteOne(filter: any): Promise<any> {
    return this.rolePermissionModel.deleteOne(filter).exec();
  }

  async deleteMany(filter: any): Promise<any> {
    return this.rolePermissionModel.deleteMany(filter).exec();
  }
  async find(filter: any = {}): Promise<any> {
    const data = this.rolePermissionModel.find(filter).exec();

    return data;
  }

  async findWithPermissions(roleId: string) {
    return this.rolePermissionModel
      .aggregate([
        { $match: { roleId } },
        {
          $lookup: {
            from: "permissions",
            localField: "permissionId",
            foreignField: "permissionId",
            as: "permission",
          },
        },
        { $unwind: "$permission" },
      ])
      .exec();
  }
}
