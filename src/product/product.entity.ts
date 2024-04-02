import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/category/category.entity";

@Entity({ name: "products" })
export class ProductEntity {
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

  @ApiProperty({ example: "product@webui.com" })
  @Column()
  email: string;

  @ApiProperty()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(
    () => CategoryEntity,
    (сategory: CategoryEntity) => сategory.products
  )
  сategory: Promise<CategoryEntity>;
}
