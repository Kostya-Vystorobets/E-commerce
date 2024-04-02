import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProductEntity } from "src/product/product.entity";

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: "General Management" })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Responsible for the management of the company" })
  readonly description: string;

  readonly products: Promise<ProductEntity[]>;
}
