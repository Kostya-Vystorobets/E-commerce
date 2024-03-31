import { DepartmentEntity } from "./../department/department.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "employees" })
export class EmployeeEntity {
  @ApiProperty({ example: "12532" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Sampson" })
  @Column()
  userName: string;

  @ApiProperty({ example: "Harry" })
  @Column()
  firstName: string;

  @ApiProperty({ example: "Daines" })
  @Column()
  lastName: string;

  @ApiProperty({ example: "employee@webui.com" })
  @Column()
  email: string;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => DepartmentEntity,
    (department: DepartmentEntity) => department.employees
  )
  department: Promise<DepartmentEntity>;
}
