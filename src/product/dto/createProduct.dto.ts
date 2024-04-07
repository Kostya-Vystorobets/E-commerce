import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/category/category.entity";

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Handbag" })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "ABC123" })
  readonly productCode: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 30.0 })
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10 })
  readonly quantity: number;

  @IsNotEmpty()
  @ApiProperty({ example: "A wonderful product" })
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  readonly isSold: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  readonly isActive: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2024-04-07T10:00:00Z" })
  readonly soldAt?: Date;

  сategory: CategoryEntity;
}
