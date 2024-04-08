import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, HttpException } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CategoryService } from "../../src/category/category.service";
import { CategoryEntity } from "../../src/category/category.entity";
import { DeleteResult, Repository, getRepository } from "typeorm";
import { CreateCategoryDto } from "../../src/category/dto/createCategory.dto";
import { UpdateCategoryDto } from "../../src/category/dto/updateCategory.dto";

describe("CategoryService", () => {
  let service: CategoryService;
  let categoryRepository: jest.Mocked<Repository<CategoryEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useFactory: () => ({
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity)
    ) as jest.Mocked<Repository<CategoryEntity>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe("getAll", () => {
  //   it("should return all categories without pagination", async () => {
  //     const categories: CategoryEntity[] = [
  //       {
  //         id: 1,
  //         name: "Category 1",
  //         description: "Description 1",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         products: Promise.resolve([]),
  //       },
  //       {
  //         id: 2,
  //         name: "Category 2",
  //         description: "Description 2",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         products: Promise.resolve([]),
  //       },
  //     ];
  //     const count = 2;

  //     jest
  //       .spyOn(categoryRepository, "findAndCount")
  //       .mockResolvedValueOnce([categories, count]);

  //     const result = await service.getAll({});

  //     expect(result.data).toEqual(categories);
  //     expect(result.count).toBe(count);
  //   });

  //   it("should return paginated categories", async () => {
  //     const categories: CategoryEntity[] = [
  //       {
  //         id: 1,
  //         name: "Category 1",
  //         description: "Description 1",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         products: Promise.resolve([]),
  //       },
  //       {
  //         id: 2,
  //         name: "Category 2",
  //         description: "Description 2",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         products: Promise.resolve([]),
  //       },
  //     ];
  //     const count = 2;

  //     jest
  //       .spyOn(categoryRepository, "findAndCount")
  //       .mockResolvedValueOnce([categories, count]);

  //     const result = await service.getAll({ limit: 10, offset: 0 });

  //     expect(result.data).toEqual(categories);
  //     expect(result.count).toBe(count);
  //   });

  //   it("should return categories filtered by name", async () => {
  //     const categories: CategoryEntity[] = [
  //       {
  //         id: 1,
  //         name: "Category 1",
  //         description: "Description 1",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         products: Promise.resolve([]),
  //       },
  //       {
  //         id: 2,
  //         name: "Category 2",
  //         description: "Description 2",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         products: Promise.resolve([]),
  //       },
  //     ];
  //     const count = 2;

  //     jest
  //       .spyOn(categoryRepository, "findAndCount")
  //       .mockResolvedValueOnce([categories, count]);

  //     const result = await service.getAll({ name: "Category 1" });

  //     expect(result.data).toEqual([categories[0]]);
  //     expect(result.count).toBe(1);
  //   });
  // });

  describe("getById", () => {
    it("should return a category by ID", async () => {
      const categoryId = 1;
      const mockCategory: CategoryEntity = {
        id: categoryId,
        name: "Category 1",
        description: "Description 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      jest
        .spyOn(categoryRepository, "findOne")
        .mockResolvedValueOnce(mockCategory);

      const result = await service.getById(categoryId);

      expect(result).toEqual(mockCategory);
    });

    it("should throw an exception if category with the provided ID does not exist", async () => {
      const categoryId = 1;

      jest.spyOn(categoryRepository, "findOne").mockResolvedValueOnce(null);

      try {
        await service.getById(categoryId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The сategory with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe("createCategory", () => {
    it("should create a new category", async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: "Test Category",
        description: "Test Description",
        products: null,
      };

      const mockCategory: CategoryEntity = {
        id: 1,
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      jest.spyOn(categoryRepository, "findOne").mockResolvedValueOnce(null);
      jest
        .spyOn(categoryRepository, "save")
        .mockResolvedValueOnce(mockCategory);

      const result = await service.createCategory(createCategoryDto);

      expect(result).toEqual(mockCategory);
    });

    it("should throw an exception if category with the provided name already exists", async () => {
      const existingCategory: CategoryEntity = {
        id: 1,
        name: "Test Category",
        description: "Test Description",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      const createCategoryDto: CreateCategoryDto = {
        name: existingCategory.name,
        description: "Test Description",
        products: null,
      };

      jest
        .spyOn(categoryRepository, "findOne")
        .mockResolvedValueOnce(existingCategory);

      try {
        await service.createCategory(createCategoryDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(
          "The Category with this Name already exists."
        );
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe("updateById", () => {
    it("should update a category", async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        description: "Updated Description",
      };

      const mockCategory: CategoryEntity = {
        id: categoryId,
        name: "Test Category",
        description: updateCategoryDto.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      jest.spyOn(service, "getById").mockResolvedValueOnce(mockCategory);
      jest
        .spyOn(categoryRepository, "save")
        .mockResolvedValueOnce(mockCategory);

      const result = await service.updateById(categoryId, updateCategoryDto);

      expect(result).toEqual(mockCategory);
    });

    it("should throw an exception if category with the provided ID does not exist", async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        description: "Updated Description",
      };

      jest.spyOn(service, "getById").mockResolvedValueOnce(null);

      try {
        await service.updateById(categoryId, updateCategoryDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Category with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe("deleteById", () => {
    it("should delete a category", async () => {
      const categoryId = 1;
      const deleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      };

      jest
        .spyOn(categoryRepository, "delete")
        .mockResolvedValueOnce(deleteResult);

      const result = await service.deleteById(categoryId);

      expect(result).toEqual(deleteResult);
    });

    it("should throw an exception if category with the provided ID does not exist", async () => {
      const categoryId = 1;

      jest.spyOn(categoryRepository, "delete").mockResolvedValueOnce({
        raw: {},
        affected: 0,
      });

      try {
        await service.deleteById(categoryId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Category with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
