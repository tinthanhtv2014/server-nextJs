import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseCrud } from "../base/crud.controller";
import { PermissionService } from "../../services/admin/permission.service";
import { PermissionDto } from "../../models/dto/permission/permission.dto";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionController extends BaseCrud<PermissionService>(
  "permissionId",
  PermissionDto,
  PermissionDto
) {
  constructor(private readonly permissionService: PermissionService) {
    super(permissionService);
  }
}
