import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { BaseService } from "../helper/crud.service";
import { PermissionDocument } from "../../models/entities/permission.entities";
import { PermissionRepository } from "../../repository/permission/permission.repository";
import { rolePermissionDocument } from "../../models/entities/rolePermission.entities";
import { RolePermissionRepository } from "../../repository/rolePermission/rolePermission.repository";
import { RolePermissionDto } from "../../models/dto/rolePermission/rolePermission.dto";
import { ExceptionError } from "../../shared/utils/response.util";
@Injectable()
export class PermissionService extends BaseService<PermissionDocument> {
  constructor(
    permissionRepository: PermissionRepository,
    private readonly rolePermissionRepository: RolePermissionRepository
  ) {
    super(permissionRepository);
  }

  public async createRolePermission(dto: RolePermissionDto): Promise<any> {
    try {
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
    } catch (error) {
      return ExceptionError();
    }
  }
  public async deleteRolePermission(roleId: string, permissionId?: string) {
    try {
      return this.rolePermissionRepository.deleteMany({ roleId });
    } catch (error) {
      return ExceptionError();
    }
  }
  public async getRolePermissions(roleId: string) {
    try {
      const results = await this.rolePermissionRepository.findWithPermissions(
        roleId
      );
      return results;
    } catch (error) {
      return ExceptionError();
    }
  }

  public async deleteRolePermissions(dto: RolePermissionDto): Promise<any> {
    try {
      // Xóa hàng loạt quyền của 1 role
      const deleted = await this.rolePermissionRepository.deleteMany({
        roleId: dto.roleId,
        permissionId: { $in: dto.permissionIds }, // xóa tất cả permissionId nằm trong mảng này
      });

      return deleted;
    } catch (error) {
      return ExceptionError();
    }
  }
}
