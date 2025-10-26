import { Module } from "@nestjs/common";
import { SystemController } from "../../../controller/private/system.controller";

@Module({
//   imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [SystemController],
//   providers: [UserService],
})
export class SystemModule {}