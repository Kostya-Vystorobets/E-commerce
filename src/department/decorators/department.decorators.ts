import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CreateEmployeeDto } from "src/employee/dto/createEmployee.dto";
import { EmployeeEntity } from "src/employee/employee.entity";
import { DepartmentEntity } from "../department.entity";

export function SwaggerDepartmentApiTags() {
  return applyDecorators(ApiTags("Department"));
}

export function SwaggerDepartmentGetAll() {
  return applyDecorators(
    ApiOperation({ summary: "Get all department" }),
    ApiCookieAuth(),
    ApiOkResponse({ type: DepartmentEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiNotFoundResponse({
      description: "The department with this ID was not found.",
    })
  );
}
export function SwaggerDepartmentGetById() {
  return applyDecorators(
    ApiOperation({ summary: "Get department by id" }),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiOkResponse({ type: DepartmentEntity }),
    ApiNotFoundResponse({
      description: "The department with this ID was not found.",
    })
  );
}

export function SwaggerDepartmentCreate() {
  return applyDecorators(
    ApiOperation({ summary: "Create department" }),
    ApiCookieAuth(),
    ApiOkResponse({ type: DepartmentEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse({
      description: "The department with this Name already exists.",
    })
  );
}

export function SwaggerDepartmentCreateEmployeeInDepartment() {
  return applyDecorators(
    ApiOperation({ summary: "Create employee in department by id" }),
    ApiCookieAuth(),
    ApiBody({ type: CreateEmployeeDto }),
    ApiOkResponse({ type: EmployeeEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse({
      description: "The department with this ID was not found.",
    })
  );
}
export function SwaggerDepartmentUpdeteById() {
  return applyDecorators(
    ApiOperation({ summary: "Change department by id" }),
    ApiCookieAuth(),
    ApiOkResponse({ type: DepartmentEntity }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiNotFoundResponse({
      description: "The department with this ID was not found.",
    })
  );
}

export function SwaggerDepartmentDeleteById() {
  return applyDecorators(
    ApiOperation({ summary: "Delete department by id" }),
    ApiCookieAuth(),
    ApiOkResponse({ description: "OK" }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse({
      description:
        "Unable to delete a department. The department contains employees.",
    }),
    ApiNotFoundResponse({
      description: "The department with this ID was not found.",
    })
  );
}
