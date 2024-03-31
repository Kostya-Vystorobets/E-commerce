import { EmployeeEntity } from "src/employee/employee.entity";
import { EmployeeSevice } from "./../employee/employee.service";
import { DepartmentEntity } from "./department.entity";
import { DepartmentSevice } from "./department.service";
import { DepartmentController } from "./department.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, EmployeeEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentSevice, EmployeeSevice],
})
export class DepartmentModule {}
