import "module-alias/register";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { setupSwagger } from "./start/swagger.setup";
import { Logger } from "@nestjs/common";
import { ApiResponseInterceptor } from "./shared/interceptors/apiResponse.interceptors";
const severInitLog = new Logger("App");

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  setupSwagger(app);

  await app.listen(process.env.PORT || 5001, "0.0.0.0");
  severInitLog.log(
    `${process.env.SEVER_NAME} Server listening on ${process.env.DOMAIN}`
  );
}

bootstrap();
