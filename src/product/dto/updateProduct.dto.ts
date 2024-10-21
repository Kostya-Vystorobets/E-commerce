import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
} from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: "Handbag" })
  readonly name?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: "ABC123" })
  readonly productCode?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 30.0 })
  readonly price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 10 })
  readonly quantity?: number;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: "A wonderful product" })
  readonly description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  readonly isSold?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  readonly isActive?: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2024-04-07T10:00:00Z" })
  readonly soldAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2024-04-07T10:00:00Z" })
  readonly deletedAt?: Date;
}
