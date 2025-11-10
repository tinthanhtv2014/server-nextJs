import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "../../../controller/private/role.controller";
import { Role, RoleSchema } from "../../../models/entities/role.entities";
import { RoleService } from "../../../services/admin/role.service";
import { RoleRepository } from "../../../repository/role/role.respository";
import { PermissionModule } from "../permission/permission.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    forwardRef(() => PermissionModule),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
