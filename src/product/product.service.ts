import { UpdateProductDto } from "./dto/updateProduct.dto";
import { CreateProductDto } from "./dto/createProduct.dto";
import { ProductEntity } from "./product.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class ProductSevice {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}
  async getById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ id });
    if (!product) {
      throw new HttpException(
        "The Product with this ID was not found.",
        HttpStatus.NOT_FOUND
      );
    }
    return product;
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const newProduct = new ProductEntity();
    Object.assign(newProduct, createProductDto);
    const сheckProductCode = await this.productRepository.findOne({
      productCode: newProduct.productCode,
    });
    if (сheckProductCode) {
      throw new HttpException(
        "The product with this productCode already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.productRepository.save(newProduct);
  }

  async updeteById(
    id: number,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const product = await this.getById(id);
    Object.assign(product, updateProductDto);

    const сheckProductCode = await this.productRepository.findOne({
      productCode: product.productCode,
    });
    if (сheckProductCode) {
      throw new HttpException(
        "The product with this productCode already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.productRepository.save(product);
  }

  async deleteById(id: number): Promise<DeleteResult> {
    await this.getById(id);
    return await this.productRepository.delete({ id });
  }
}
