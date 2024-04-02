import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/category/category.entity";

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Sampson" })
  readonly userName: string;

  @IsNotEmpty()
  @ApiProperty({ example: "product@webui.com" })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Harry" })
  readonly firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Daines" })
  readonly lastName: string;

  сategory: CategoryEntity;
}
