import { Controller, Body, Post, Delete, Query, Get } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { BaseCrud } from "../base/crud.controller";
import { PermissionService } from "../../services/admin/permission.service";
import { PermissionDto } from "../../models/dto/permission/permission.dto";
import { RolePermissionDto } from "../../models/dto/rolePermission/rolePermission.dto";

@ApiTags("Permissions")
@ApiBearerAuth("access-token")
@Controller("permissions")
export class PermissionController extends BaseCrud<PermissionService>(
  "permissionId",
  PermissionDto,
  PermissionDto
) {
  constructor(private readonly permissionService: PermissionService) {
    super(permissionService);
  }

  @Post("rolePermission")
  @ApiOperation({ summary: "Link Role and Permissions" })
  async createRolePermission(@Body() body: RolePermissionDto) {
    try {
      return this.permissionService.createRolePermission(body);
    } catch (error) {
      this.ExceptionError("/api/v1/admin/rolePermission/create", error);
    }
  }

  @Delete("rolePermissions")
  @ApiOperation({ summary: "Unlink multiple Permissions from a Role" })
  async deleteRolePermissions(@Body() body: RolePermissionDto) {
    try {
      if (!body.roleId) {
        return this.BadRequest("Thiếu dữ liệu roleId", 400);
      }

      if (!body.permissionIds || body.permissionIds.length === 0) {
        return this.BadRequest("Thiếu dữ liệu permissionIds", 400);
      }
      return this.permissionService.deleteRolePermissions(body);
    } catch (error) {
      this.ExceptionError("/api/v1/admin/rolePermission/delete", error);
    }
  }

  @Get("rolePermission")
  @ApiOperation({ summary: "Get permissions linked to a role" })
  @ApiQuery({ name: "roleId", required: true })
  async getRolePermissions(@Query("roleId") roleId: string) {
    return this.permissionService.getRolePermissions(roleId);
  }
}
