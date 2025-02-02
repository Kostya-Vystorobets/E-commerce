import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("db.postgres.host"),
        port: Number(configService.get<string>("db.postgres.port")),
        username: configService.get<string>("db.postgres.username"),
        password: configService.get<string>("db.postgres.password"),
        database: configService.get<string>("db.postgres.database"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: true,
        migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
        cli: { migrationsDir: "src/migrations" },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
