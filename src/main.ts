import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import seedDatabase from "./database/seed.database";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>("http.port") || 3000;

  const configSwagger = new DocumentBuilder()
    .setTitle("Corporation")
    .setDescription(
      "This is the Training Server of the IT Academy. Management of categories and products."
    )
    .setVersion("2.0")
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("api/v2", app, document);

  await seedDatabase();
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
