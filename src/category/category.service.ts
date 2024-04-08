import { CreateCategoryDto } from "./dto/createCategory.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import { CategorysOptionInterface } from "./types/categoriesOptions.interface";
import { CategorysResponseInterface } from "./types/categoriesResponse.interface";
import { CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly сategoryRepository: Repository<CategoryEntity>
  ) {}
  async getAll(
    query: CategorysOptionInterface
  ): Promise<CategorysResponseInterface> {
    const queryBuilder =
      getRepository(CategoryEntity).createQueryBuilder("сategory");
    const categoriesCount = await queryBuilder.getCount();
    queryBuilder.orderBy("сategory.name", "ASC");
    if (query.name) {
      queryBuilder.andWhere("сategory.name = :name", { name: query.name });
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }
    const categories = await queryBuilder.getMany();
    return { count: categoriesCount, data: categories };
  }
  async getById(id: number): Promise<CategoryEntity> {
    const сategory = await this.сategoryRepository.findOne({ id });
    if (!сategory) {
      throw new HttpException(
        "The сategory with this ID was not found.",
        HttpStatus.NOT_FOUND
      );
    }
    await сategory.products;
    return сategory;
  }
  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryEntity> {
    const newCategory = new CategoryEntity();
    Object.assign(newCategory, createCategoryDto);
    const сheckName = await this.сategoryRepository.findOne({
      name: newCategory.name,
    });
    if (сheckName) {
      throw new HttpException(
        "The Category with this Name already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.сategoryRepository.save(newCategory);
  }

  async updateById(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryEntity> {
    const сategory = await this.getById(id);
    if (!сategory) {
      throw new HttpException(
        "The Category with this ID was not found.",
        HttpStatus.NOT_FOUND
      );
    }
    Object.assign(сategory, updateCategoryDto);
    return await this.сategoryRepository.save(сategory);
  }
  async deleteById(id: number): Promise<DeleteResult> {
    try {
      return await this.сategoryRepository.delete({ id });
    } catch (error) {
      throw new HttpException(
        "Unable to delete a сategory. The сategory contains products.",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
