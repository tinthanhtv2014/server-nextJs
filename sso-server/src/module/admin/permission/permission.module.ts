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
import { RolePermissionRepository } from "../../../repository/rolePermission/rolePermission.repository";
import {
  rolePermission,
  rolePermissionSchema,
} from "../../../models/entities/rolePermission.entities";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
      { name: rolePermission.name, schema: rolePermissionSchema },
    ]),
    forwardRef(() => RoleModule),
  ],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    PermissionRepository,
    RolePermissionRepository,
  ],
})
export class PermissionModule {}
