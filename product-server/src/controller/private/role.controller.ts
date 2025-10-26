import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseCrud } from "../base/crud.controller";
import { RoleService } from "../../services/admin/role.service";
import { RoleDto } from "../../models/dto/role/role.dto";

@ApiTags('Roles')
@Controller('roles')
export class RoleController extends BaseCrud<RoleService>(
  "roleId",
  RoleDto,
  RoleDto,
) {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}