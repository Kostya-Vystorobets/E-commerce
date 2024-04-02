import { ProductEntity } from "./product.entity";
import { ProductSevice } from "./product.service";
import { ProductController } from "./product.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductSevice],
})
export class ProductModule {}
