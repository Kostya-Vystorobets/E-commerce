import { EmployeeSevice } from "./../employee/employee.service";
import { CreateDepartmentDto } from "./dto/createDepartment.dto";
import { DepartmentEntity } from "./department.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { UpdateDepartmentDto } from "./dto/updateDepartment.dto";
import { DepartmentsResponseInterface } from "./types/departmentsResponse.interface";
import { DepartmentsOptionInterface } from "./types/departmentsOptions.interface";
import { CreateEmployeeDto } from "src/employee/dto/createEmployee.dto";
import { EmployeeEntity } from "src/employee/employee.entity";

@Injectable()
export class DepartmentSevice {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    private readonly employeeSevice: EmployeeSevice
  ) {}
  async getAll(
    query: DepartmentsOptionInterface
  ): Promise<DepartmentsResponseInterface> {
    const queryBuilder =
      getRepository(DepartmentEntity).createQueryBuilder("department");
    const departmentsCount = await queryBuilder.getCount();
    queryBuilder.orderBy("department.name", "ASC");
    if (query.name) {
      queryBuilder.andWhere("department.name = :name", { name: query.name });
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const departments = await queryBuilder.getMany();
    return { count: departmentsCount, data: departments };
  }
  async getById(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOne({ id });
    if (!department) {
      throw new HttpException(
        "The department with this ID was not found.",
        HttpStatus.NOT_FOUND
      );
    }
    await department.employees;
    return department;
  }
  async createDepartment(
    createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    const newDepartment = new DepartmentEntity();
    Object.assign(newDepartment, createDepartmentDto);
    const сheckName = await this.departmentRepository.findOne({
      name: newDepartment.name,
    });
    if (сheckName) {
      throw new HttpException(
        "The department with this Name already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.departmentRepository.save(newDepartment);
  }

  async createEmployeeInDepartment(
    id: number,
    createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    const currentDepartment = await this.getById(id);
    const newEmployee = await this.employeeSevice.createEmployee(
      createEmployeeDto
    );
    (await currentDepartment.employees).push(newEmployee);
    await this.departmentRepository.save(currentDepartment);
    return newEmployee;
  }

  async updeteById(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto
  ): Promise<DepartmentEntity> {
    const department = await this.getById(id);
    Object.assign(department, updateDepartmentDto);
    return await this.departmentRepository.save(department);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    try {
      return await this.departmentRepository.delete({ id });
    } catch (error) {
      throw new HttpException(
        "Unable to delete a department. The department contains employees.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
