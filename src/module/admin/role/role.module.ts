import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "../../../controller/private/role.controller";
import { Role, RoleSchema } from "../../../models/entities/role.entities";
import { RoleService } from "../../../services/admin/role.service";
import { RoleRepository } from "../../../repository/role/role.respository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
  controllers: [RoleController],
  providers: [RoleService,RoleRepository],
})
export class RoleModule {}