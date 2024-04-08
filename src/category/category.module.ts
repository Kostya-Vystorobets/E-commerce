import { ProductEntity } from "src/product/product.entity";
import { ProductService } from "../product/product.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./category.controller";
import { CategorySevice } from "./category.service";
import { CategoryEntity } from "./category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
  controllers: [CategoryController],
  providers: [CategorySevice, ProductService],
})
export class CategoryModule {}
