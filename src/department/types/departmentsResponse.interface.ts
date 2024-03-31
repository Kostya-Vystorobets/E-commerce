import { DepartmentEntity } from "src/department/department.entity";
export interface DepartmentsResponseInterface {
  count: number;
  data: DepartmentEntity[];
}
