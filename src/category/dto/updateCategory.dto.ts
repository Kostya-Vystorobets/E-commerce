import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Responsible for the management of the company" })
  readonly description: string;
}
