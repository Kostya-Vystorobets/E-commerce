import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, HttpException } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { CategoryController } from "../../src/category/category.controller";
import { CategoryService } from "../../src/category/category.service";
import { CategoryEntity } from "../../src/category/category.entity";
import { UpdateCategoryDto } from "../../src/category/dto/updateCategory.dto";
import { CategorysResponseInterface } from "../../src/category/types/categoriesResponse.interface";
import { CreateCategoryDto } from "../../src/category/dto/createCategory.dto";

describe("CategoryController", () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            createCategory: jest.fn(),
            createProductInCategory: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new category and return category data after successful creation", async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: "Category 1",
        description: "Description 1",
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

      jest
        .spyOn(categoryService, "createCategory")
        .mockResolvedValueOnce(mockCategory);

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(mockCategory);
    });

    it("should throw an exception if a category with the provided name already exists", async () => {
      const existingCategory: CategoryEntity = {
        id: 1,
        name: "Category 1",
        description: "Description 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      const createCategoryDto: CreateCategoryDto = {
        name: existingCategory.name,
        description: "Description 2",
        products: null,
      };

      jest
        .spyOn(categoryService, "createCategory")
        .mockRejectedValueOnce(
          new HttpException(
            "The Category with this Name already exists.",
            HttpStatus.BAD_REQUEST
          )
        );

      try {
        await controller.create(createCategoryDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(
          "The Category with this Name already exists."
        );
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe("getAll", () => {
    it("should return all categories", async () => {
      const categories: CategorysResponseInterface = {
        count: 2,
        data: [
          {
            id: 1,
            name: "Category 1",
            description: "Description 1",
            createdAt: new Date(),
            updatedAt: new Date(),
            products: Promise.resolve([]),
          },
          {
            id: 2,
            name: "Category 2",
            description: "Description 2",
            createdAt: new Date(),
            updatedAt: new Date(),
            products: Promise.resolve([]),
          },
        ],
      };

      jest.spyOn(categoryService, "getAll").mockResolvedValueOnce(categories);

      const result = await controller.getAll({});

      expect(result).toEqual(categories);
    });
  });

  describe("getById", () => {
    it("should return a category by ID", async () => {
      const category: CategoryEntity = {
        id: 1,
        name: "Category 1",
        description: "Description 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      jest.spyOn(categoryService, "getById").mockResolvedValueOnce(category);

      const result = await controller.getById(1);

      expect(result).toEqual(category);
    });
  });

  describe("update", () => {
    it("should update a category and return updated category data after successful update", async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        description: "Updated Description",
      };

      const mockCategory: CategoryEntity = {
        id: categoryId,
        name: "Category 1",
        description: updateCategoryDto.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: Promise.resolve([]),
      };

      jest
        .spyOn(categoryService, "updateById")
        .mockResolvedValueOnce(mockCategory);

      const result = await controller.updeteById(categoryId, updateCategoryDto);

      expect(result).toEqual(mockCategory);
    });

    it("should throw an exception if category with the provided ID does not exist", async () => {
      const categoryId = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        description: "Updated Description",
      };

      jest
        .spyOn(categoryService, "updateById")
        .mockRejectedValueOnce(
          new HttpException(
            "The Category with this ID was not found.",
            HttpStatus.NOT_FOUND
          )
        );

      try {
        await controller.updeteById(categoryId, updateCategoryDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Category with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe("delete", () => {
    it("should delete a category and return delete result after successful deletion", async () => {
      const categoryId = 1;
      const deleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      };

      jest
        .spyOn(categoryService, "deleteById")
        .mockResolvedValueOnce(deleteResult);

      const result = await controller.deleteById(categoryId);

      expect(result).toEqual(deleteResult);
    });

    it("should throw an exception if category with the provided ID does not exist", async () => {
      const categoryId = 1;

      jest
        .spyOn(categoryService, "deleteById")
        .mockRejectedValueOnce(
          new HttpException(
            "The Category with this ID was not found.",
            HttpStatus.NOT_FOUND
          )
        );

      try {
        await controller.deleteById(categoryId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Category with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
