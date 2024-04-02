import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "src/product/product.entity";

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "categories" })
export class CategoryEntity {
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
    () => ProductEntity,
    (product: ProductEntity) => product.сategory,
    {
      nullable: false,
      onDelete: "RESTRICT",
    }
  )
  @JoinColumn({ name: "products" })
  @ApiProperty()
  products: Promise<ProductEntity[]>;
}
