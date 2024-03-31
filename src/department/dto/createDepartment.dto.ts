import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { EmployeeEntity } from "src/employee/employee.entity";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @ApiProperty({ example: "General Management" })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: "Responsible for the management of the company" })
  readonly description: string;

  readonly employees: Promise<EmployeeEntity[]>;
}
