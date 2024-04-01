import { UserEntity } from "./user.entity";
import { UserSevice } from "./user.service";
import { UserController } from "./user.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserSevice, AuthGuard],
  exports: [UserSevice],
})
export class UserModule {}
