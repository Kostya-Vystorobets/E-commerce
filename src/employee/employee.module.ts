import { EmployeeEntity } from "./employee.entity";
import { EmployeeSevice } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeSevice],
})
export class EmployeeModule {}
