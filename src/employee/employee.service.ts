import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";
import { CreateEmployeeDto } from "./dto/createEmployee.dto";
import { EmployeeEntity } from "./employee.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class EmployeeSevice {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>
  ) {}
  async getById(id: number): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({ id });
    if (!employee) {
      throw new HttpException(
        "The Employee with this ID was not found.",
        HttpStatus.NOT_FOUND
      );
    }
    return employee;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    const newEmployee = new EmployeeEntity();
    Object.assign(newEmployee, createEmployeeDto);
    const сheckEmail = await this.employeeRepository.findOne({
      email: newEmployee.email,
    });
    if (сheckEmail) {
      throw new HttpException(
        "The employee with this Email already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    const сheckUserName = await this.employeeRepository.findOne({
      userName: newEmployee.userName,
    });
    if (сheckUserName) {
      throw new HttpException(
        "The employee with this User Name already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.employeeRepository.save(newEmployee);
  }

  async updeteById(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<EmployeeEntity> {
    const employee = await this.getById(id);
    Object.assign(employee, updateEmployeeDto);

    const сheckEmail = await this.employeeRepository.findOne({
      email: employee.email,
    });
    if (сheckEmail) {
      throw new HttpException(
        "The employee with this Email already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.employeeRepository.save(employee);
  }

  async deleteById(id: number): Promise<DeleteResult> {
    await this.getById(id);
    return await this.employeeRepository.delete({ id });
  }
}
