import {
  Controller,
  Body,
  Post,
  Put,
  Param,
  Delete,
  Query,
  Get,
} from "@nestjs/common";
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
@ApiBearerAuth("access-token") // dùng token đã khai báo ở swagger
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
  @ApiOperation({ summary: "Linked Role and Permission" })
  async createRolePermission(@Body() body: RolePermissionDto) {
    return this.permissionService.createRolePermission(body);
  }

  @Delete("rolePermission")
  @ApiOperation({ summary: "Unlink Role and Permission" })
  async deleteRolePermission(
    @Body() body: { roleId: string; permissionId?: string }
  ) {
    return this.permissionService.deleteRolePermission(
      body.roleId,
      body.permissionId
    );
  }
  @Get("rolePermission")
  @ApiOperation({ summary: "Get permissions linked to a role" })
  @ApiQuery({ name: "roleId", required: true })
  async getRolePermissions(@Query("roleId") roleId: string) {
    return this.permissionService.getRolePermissions(roleId);
  }
}
