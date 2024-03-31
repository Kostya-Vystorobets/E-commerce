import { EmployeeModule } from "./employee/employee.module";
import { DepartmentModule } from "./department/department.module";
import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("http.host"),
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
    DepartmentModule,
    EmployeeModule,
  ],
})
export class AppModule {}
