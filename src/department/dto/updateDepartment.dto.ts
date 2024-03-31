import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateDepartmentDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Responsible for the management of the company" })
  readonly description: string;
}
