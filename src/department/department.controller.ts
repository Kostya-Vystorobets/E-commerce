import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  SwaggerDepartmentApiTags,
  SwaggerDepartmentCreate,
  SwaggerDepartmentCreateEmployeeInDepartment,
  SwaggerDepartmentDeleteById,
  SwaggerDepartmentGetAll,
  SwaggerDepartmentGetById,
  SwaggerDepartmentUpdeteById,
} from "./decorators/department.decorators";
import { CreateEmployeeDto } from "src/employee/dto/createEmployee.dto";
import { AuthGuard } from "src/user/guards/auth.guard";
import { DeleteResult } from "typeorm";
import { DepartmentEntity } from "./department.entity";
import { DepartmentSevice } from "./department.service";
import { CreateDepartmentDto } from "./dto/createDepartment.dto";
import { UpdateDepartmentDto } from "./dto/updateDepartment.dto";
import { DepartmentsOptionInterface } from "./types/departmentsOptions.interface";
import { DepartmentsResponseInterface } from "./types/departmentsResponse.interface";
import { EmployeeEntity } from "src/employee/employee.entity";

@SwaggerDepartmentApiTags()
@Controller("/api/v2/departments")
export class DepartmentController {
  constructor(private readonly departmentServise: DepartmentSevice) {}
  @Get()
  @SwaggerDepartmentGetAll()
  @UseGuards(AuthGuard)
  async getAll(
    @Query() query: DepartmentsOptionInterface
  ): Promise<DepartmentsResponseInterface> {
    return this.departmentServise.getAll(query);
  }
  @Get(":id")
  @SwaggerDepartmentGetById()
  @UseGuards(AuthGuard)
  async getById(@Param("id") id: number): Promise<DepartmentEntity> {
    return this.departmentServise.getById(id);
  }
  @Post()
  @SwaggerDepartmentCreate()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    return this.departmentServise.createDepartment(createDepartmentDto);
  }
  @Post(":id/employees")
  @SwaggerDepartmentCreateEmployeeInDepartment()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createEmployeeInDepartment(
    @Param("id") id: number,
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    return this.departmentServise.createEmployeeInDepartment(
      id,
      createEmployeeDto
    );
  }
  @Patch(":id")
  @SwaggerDepartmentUpdeteById()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updeteById(
    @Param("id") id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<DepartmentEntity> {
    return this.departmentServise.updeteById(id, updateDepartmentDto);
  }
  @Delete(":id")
  @SwaggerDepartmentDeleteById()
  @UseGuards(AuthGuard)
  async deleteById(@Param("id") id: number): Promise<DeleteResult> {
    return this.departmentServise.deleteById(id);
  }
}
