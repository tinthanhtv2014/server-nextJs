import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SystemModule } from "./system/system.module";
import { RouterModule } from "@nestjs/core";
import { LoggerMiddleware } from "../../middleware/auth.middleware";
import { RoleModule } from "./role/role.module";
import { BlogModule } from "./blog/blog.module";
import { PermissionModule } from "./permission/permission.module";

export const AdminRegistryModule = [
  UserModule,
  SystemModule,
  RoleModule,
  BlogModule,
  PermissionModule,
];

@Module({
  imports: [
    ...AdminRegistryModule,
    RouterModule.register(
      AdminRegistryModule.map((module) => ({
        path: "api/v1/admin", // prefix chung cho tất cả module con
        module,
      }))
    ),
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 2️⃣ Áp middleware cho tất cả route admin
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: "api/v1/admin/UsersPrivate/login", method: RequestMethod.POST },
        {
          path: "api/v1/admin/UsersPrivate/register",
          method: RequestMethod.POST,
        }
      )
      .forRoutes({ path: "api/v1/admin/(.*)", method: RequestMethod.ALL });
  }
}
