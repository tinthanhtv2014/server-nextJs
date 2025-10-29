import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "../../../controller/private/user.controller";
import { User, UserSchema } from "../../../models/entities/user.entities";
import { UserService } from "../../../services/admin/user.service";
import { UserRepository } from "../../../repository/user/user.respository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
