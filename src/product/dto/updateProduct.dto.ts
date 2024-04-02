import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateProductDto {
  @IsNotEmpty()
  @ApiProperty({ example: "product@webui.com" })
  readonly email: string;
}
