import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { UpdateProductDto } from "./dto/updateProduct.dto";
import { AuthGuard } from "src/user/guards/auth.guard";
import { ProductSevice } from "./product.service";
import { ProductEntity } from "./product.entity";
import {
  SwaggerProductApiTags,
  SwaggerProductDeleteById,
  SwaggerProductGetById,
  SwaggerProductUpdeteById,
} from "./decorators/product.decorators";

@SwaggerProductApiTags()
@Controller("/api/v2/products")
export class ProductController {
  constructor(private readonly productServise: ProductSevice) {}
  @Get(":id")
  @SwaggerProductGetById()
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<ProductEntity> {
    return this.productServise.getById(id);
  }
  @Patch(":id")
  @SwaggerProductUpdeteById()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateProducttDto: UpdateProductDto
  ): Promise<ProductEntity> {
    return this.productServise.updeteById(id, updateProducttDto);
  }
  @Delete(":id")
  @SwaggerProductDeleteById()
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number) {
    return this.productServise.deleteById(id);
  }
}
