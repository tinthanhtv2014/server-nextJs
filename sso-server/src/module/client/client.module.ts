import { Module } from '@nestjs/common';
import { ClientUserModule } from './user/client-user.module';
import { RouterModule } from '@nestjs/core';

export const ClientRegistryModule = [
  ClientUserModule
]

@Module({
  imports: [
    ...ClientRegistryModule,
    RouterModule.register(
      ClientRegistryModule.map((module) => ({
        path: 'api/v1/client', // prefix chung cho tất cả module con
        module,
      })),
    ),
  ],
})
export class ClientModule {}