import { ApiProperty } from "@nestjs/swagger";
import { EmployeeEntity } from "src/employee/employee.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "departments" })
export class DepartmentEntity {
  @ApiProperty({ example: "87532" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "General Management" })
  @Column()
  name: string;

  @ApiProperty({ example: "Responsible for the management of the company" })
  @Column()
  description: string;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(
    () => EmployeeEntity,
    (employee: EmployeeEntity) => employee.department,
    {
      nullable: false,
      onDelete: "RESTRICT",
    }
  )
  @JoinColumn({ name: "employees" })
  @ApiProperty()
  employees: Promise<EmployeeEntity[]>;
}
