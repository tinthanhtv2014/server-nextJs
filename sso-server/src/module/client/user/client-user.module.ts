import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../../models/entities/user.entities";
import { UserService } from "../../../services/admin/user.service";
import { UserController } from "../../../controller/client/user.controller";
import { UserRepository } from "../../../repository/user/user.respository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class ClientUserModule {}
