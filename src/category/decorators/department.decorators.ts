import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CreateProductDto } from "src/product/dto/createProduct.dto";
import { ProductEntity } from "src/product/product.entity";
import { CategoryEntity } from "../category.entity";

export function SwaggerCategoryApiTags() {
  return applyDecorators(ApiTags("Category"));
}

export function SwaggerCategoryGetAll() {
  return applyDecorators(
    ApiOperation({ summary: "Get all сategory" }),
    ApiCookieAuth(),
    ApiOkResponse({ type: CategoryEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiNotFoundResponse({
      description: "The сategory with this ID was not found.",
    })
  );
}
export function SwaggerCategoryGetById() {
  return applyDecorators(
    ApiOperation({ summary: "Get сategory by id" }),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiOkResponse({ type: CategoryEntity }),
    ApiNotFoundResponse({
      description: "The сategory with this ID was not found.",
    })
  );
}

export function SwaggerCategoryCreate() {
  return applyDecorators(
    ApiOperation({ summary: "Create сategory" }),
    ApiCookieAuth(),
    ApiOkResponse({ type: CategoryEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse({
      description: "The сategory with this Name already exists.",
    })
  );
}

export function SwaggerCategoryCreateProductInCategory() {
  return applyDecorators(
    ApiOperation({ summary: "Create product in сategory by id" }),
    ApiCookieAuth(),
    ApiBody({ type: CreateProductDto }),
    ApiOkResponse({ type: ProductEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse({
      description: "The сategory with this ID was not found.",
    })
  );
}
export function SwaggerCategoryUpdeteById() {
  return applyDecorators(
    ApiOperation({ summary: "Change сategory by id" }),
    ApiCookieAuth(),
    ApiOkResponse({ type: CategoryEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiNotFoundResponse({
      description: "The сategory with this ID was not found.",
    })
  );
}

export function SwaggerCategoryDeleteById() {
  return applyDecorators(
    ApiOperation({ summary: "Delete сategory by id" }),
    ApiCookieAuth(),
    ApiOkResponse({ description: "OK" }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse({
      description:
        "Unable to delete a сategory. The сategory contains products.",
    }),
    ApiNotFoundResponse({
      description: "The сategory with this ID was not found.",
    })
  );
}
