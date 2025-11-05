import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { BaseService } from "../helper/crud.service";
import { PermissionDocument } from "../../models/entities/permission.entities";
import { PermissionRepository } from "../../repository/permission/permission.repository";
import { rolePermissionDocument } from "../../models/entities/rolePermission.entities";
import { RolePermissionRepository } from "../../repository/rolePermission/rolePermission.repository";
import { RolePermissionDto } from "../../models/dto/rolePermission/rolePermission.dto";
@Injectable()
export class PermissionService extends BaseService<PermissionDocument> {
  constructor(
    permissionRepository: PermissionRepository,
    private readonly rolePermissionRepository: RolePermissionRepository
  ) {
    super(permissionRepository);
  }

  public async createRolePermission(dto: RolePermissionDto): Promise<any> {
    // Lặp qua mảng permissionId để tạo nhiều bản ghi
    const rolePermissions = dto.permissionIds.map((permissionId) => ({
      rolePermissionId: uuidv4(),
      roleId: dto.roleId,
      permissionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Tạo hàng loạt (insertMany)
    const created = await this.rolePermissionRepository.insertMany(
      rolePermissions
    );

    return created;
  }
  public async deleteRolePermission(roleId: string, permissionId?: string) {
    if (!roleId) {
      throw new Error("roleId is required");
    }

    // Nếu có permissionId → xóa 1 cặp cụ thể
    if (permissionId) {
      return this.rolePermissionRepository.deleteOne({ roleId, permissionId });
    }

    // Nếu không có permissionId → xóa tất cả permission của role đó
    return this.rolePermissionRepository.deleteMany({ roleId });
  }
  public async getRolePermissions(roleId: string) {
    if (!roleId) throw new Error("roleId is required");
    const results = await this.rolePermissionRepository.findWithPermissions(
      roleId
    );
    return results;
  }
}
