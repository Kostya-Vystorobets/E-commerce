import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @ApiProperty({ example: "employee@webui.com" })
  readonly email: string;
}
