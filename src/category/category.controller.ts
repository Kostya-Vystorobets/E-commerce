import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { CreateProductDto } from "../product/dto/createProduct.dto";
import { AuthGuard } from "../user/guards/auth.guard";
import { DeleteResult } from "typeorm";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import { ProductEntity } from "../../src/product/product.entity";
import { CategoryService } from "./category.service";
import {
  SwaggerCategoryApiTags,
  SwaggerCategoryCreate,
  SwaggerCategoryCreateProductInCategory,
  SwaggerCategoryDeleteById,
  SwaggerCategoryGetAll,
  SwaggerCategoryGetById,
  SwaggerCategoryUpdeteById,
} from "./decorators/category.decorators";
import { CategorysOptionInterface } from "./types/categoriesOptions.interface";
import { CategorysResponseInterface } from "./types/categoriesResponse.interface";
import { CategoryEntity } from "./category.entity";

@SwaggerCategoryApiTags()
@Controller("/api/v2/categories")
export class CategoryController {
  constructor(private readonly сategoryServise: CategoryService) {}
  @Get()
  @SwaggerCategoryGetAll()
  @UseGuards(AuthGuard)
  async getAll(
    @Query() query: CategorysOptionInterface
  ): Promise<CategorysResponseInterface> {
    return this.сategoryServise.getAll(query);
  }
  @Get(":id")
  @SwaggerCategoryGetById()
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<CategoryEntity> {
    return this.сategoryServise.getById(id);
  }
  @Post()
  @SwaggerCategoryCreate()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<CategoryEntity> {
    return this.сategoryServise.createCategory(createCategoryDto);
  }
  @Patch(":id")
  @SwaggerCategoryUpdeteById()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryEntity> {
    return this.сategoryServise.updateById(id, updateCategoryDto);
  }
  @Delete(":id")
  @SwaggerCategoryDeleteById()
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number): Promise<DeleteResult> {
    return this.сategoryServise.deleteById(id);
  }
}
