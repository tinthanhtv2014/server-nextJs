import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {
  ClientModule,
  ClientRegistryModule,
} from "../module/client/client.module";
import { AdminRegistryModule } from "../module/admin/admin.module";

export function setupSwagger(app: INestApplication) {
  // --- Config chung ---
  const commonConfig = new DocumentBuilder()
    .setTitle(`${process.env.SEVER_NAME} API Documentation`)
    .setDescription("Example API with Swagger")
    .setVersion("1.0")
    .build();

  // --- Admin docs ---
  const adminConfig = new DocumentBuilder()
    .setTitle(`${process.env.SEVER_NAME} API Documentation`)
    .setDescription("Example API with Admin")
    .setVersion("3.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token" // tên security name
    )
    // .addTag('admin')
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: AdminRegistryModule, // TODO: import các module admin (vd: AdminModule)
  });
  SwaggerModule.setup("docs/admin", app, adminDocument);

  // --- Client docs ---
  const clientConfig = new DocumentBuilder()
    .setTitle(`${process.env.SEVER_NAME} API Documentation`)
    .setDescription("Example API with Client / Web")
    .setVersion("3.0")
    // .addTag('client')
    .build();

  const clientDocument = SwaggerModule.createDocument(app, clientConfig, {
    include: ClientRegistryModule, // TODO: import các module client (vd: ClientModule)
  });
  SwaggerModule.setup("docs/client", app, clientDocument);

  // --- Mobile docs ---
  const mobileConfig = new DocumentBuilder()
    .setTitle(`${process.env.SEVER_NAME} API Documentation`)
    .setDescription("Example API with Mobile App")
    .setVersion("3.0")
    .addTag("mobile")
    .build();

  const mobileDocument = SwaggerModule.createDocument(app, mobileConfig, {
    include: [], // TODO: import các module mobile (vd: MobileModule)
  });
  SwaggerModule.setup("docs/mobile", app, mobileDocument);

  // console.log('Swagger docs available at:');
  // console.log('  👉 http://localhost:3000/docs/admin');
  // console.log('  👉 http://localhost:3000/docs/client');
  // console.log('  👉 http://localhost:3000/docs/mobile');
}
