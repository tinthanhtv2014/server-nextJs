import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PermissionController } from "../../../controller/private/permission.controller";
import { PermissionRepository } from "../../../repository/permission/permission.repository";
import {
  Permission,
  PermissionSchema,
} from "../../../models/entities/permission.entities";
import { RoleModule } from "../role/role.module";
import { PermissionService } from "../../../services/admin/permission.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    forwardRef(() => RoleModule),
  ],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
