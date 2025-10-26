import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./module/admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { MongoContext } from "./context/mongo.context";
import { UserModule } from "./module/admin/user/user.module";
import { ClientModule } from "./module/client/client.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // để process.env dùng toàn app
    }),
    MongoContext,
    AdminModule,
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
