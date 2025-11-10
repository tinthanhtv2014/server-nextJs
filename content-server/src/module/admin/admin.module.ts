import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { RouterModule } from "@nestjs/core";

import { BlogModule } from "./blog/blog.module";
import { BlogCategoryModule } from "./blog-category.module.ts/blog-category.module";

export const AdminRegistryModule = [BlogModule, BlogCategoryModule];

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
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude(
    //     { path: "api/v1/admin/UsersPrivate/login", method: RequestMethod.POST },
    //     {
    //       path: "api/v1/admin/UsersPrivate/register",
    //       method: RequestMethod.POST,
    //     }
    //   )
    //   .forRoutes({ path: "api/v1/admin/(.*)", method: RequestMethod.ALL });
  }
}
