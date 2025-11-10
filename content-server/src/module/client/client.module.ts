import { Module } from "@nestjs/common";

import { RouterModule } from "@nestjs/core";
import { ClientBlogModule } from "./blog/blog.module";

export const ClientRegistryModule = [ClientBlogModule];

@Module({
  imports: [
    ...ClientRegistryModule,
    RouterModule.register(
      ClientRegistryModule.map((module) => ({
        path: "api/v1/client", // prefix chung cho tất cả module con
        module,
      }))
    ),
  ],
})
export class ClientModule {}
