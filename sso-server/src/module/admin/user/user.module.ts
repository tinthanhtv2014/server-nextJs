import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../../../controller/private/user.controller';
import { User, UserSchema } from '../../../models/entities/user.entities';
import { UserService } from '../../../services/admin/user.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
