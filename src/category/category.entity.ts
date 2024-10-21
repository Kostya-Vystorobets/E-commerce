import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "../product/product.entity";

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
  @ApiProperty({ example: "36" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Accessories" })
  @Column()
  name: string;

  @ApiProperty({ example: "Description" })
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
