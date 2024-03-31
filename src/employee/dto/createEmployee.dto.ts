import { DepartmentEntity } from "src/department/department.entity";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Sampson" })
  readonly userName: string;

  @IsNotEmpty()
  @ApiProperty({ example: "employee@webui.com" })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Harry" })
  readonly firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Daines" })
  readonly lastName: string;

  department: DepartmentEntity;
}
