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

  @ApiProperty({ example: "Handbag" })
  @Column()
  name: string;

  @ApiProperty({ example: "ABC123" })
  @Column({ name: "product_code" })
  productCode: string;

  @ApiProperty({ example: 30.0 })
  @Column()
  price: number;

  @ApiProperty({ example: 10 })
  @Column()
  quantity: number;

  @ApiProperty({ example: "A wonderful product" })
  @Column()
  description: string;

  @ApiProperty({ example: true })
  @Column({ name: "is_sold" })
  isSold: boolean;

  @ApiProperty({ example: true })
  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ name: "sold_at", nullable: true })
  soldAt: Date;

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
