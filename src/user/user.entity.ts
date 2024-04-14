import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { hash } from "bcrypt";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "users" })
export class UserEntity {
  @ApiProperty({
    example: "36412",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Admin",
  })
  @Column()
  userName: string;

  @ApiProperty({
    example: "email@example.com",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "dc27ed128c2a755db896a6638",
  })
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
