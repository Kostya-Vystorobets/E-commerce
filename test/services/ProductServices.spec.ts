import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../../src/product/product.service";
import { ProductEntity } from "../../src/product/product.entity";
import { DeleteResult, Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { UpdateProductDto } from "../../src/product/dto/updateProduct.dto";
import { CreateProductDto } from "../../src/product/dto/createProduct.dto";
import { CategoryEntity } from "../../src/category/category.entity";

describe("ProductService", () => {
  let service: ProductService;
  let repository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useFactory: () => ({
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return product by ID if product exists", async () => {
      const mockProduct: ProductEntity = {
        id: 1,
        name: "Product 1",
        productCode: "ABC123",
        price: 10,
        quantity: 20,
        description: "A wonderful product",
        isSold: false,
        isActive: true,
        soldAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        сategory: null,
      };

      jest.spyOn(repository, "findOne").mockResolvedValueOnce(mockProduct);

      const result = await service.getById(1);

      expect(result).toEqual(mockProduct);
    });

    it("should throw an exception if product with the provided ID does not exist", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

      try {
        await service.getById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Product with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe("createProduct", () => {
    it("should create a new product if product code is unique", async () => {
      const createProductDto: CreateProductDto = {
        name: "Product 1",
        productCode: "ABC123",
        price: 10,
        quantity: 20,
        description: "A wonderful product",
        isSold: false,
        isActive: true,
        сategory: new CategoryEntity(),
      };

      jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);
      jest
        .spyOn(repository, "save")
        .mockResolvedValueOnce(createProductDto as any);

      const result = await service.createProduct(createProductDto);

      expect(result).toEqual(createProductDto);
    });

    it("should throw an exception if product code already exists", async () => {
      const createProductDto: CreateProductDto = {
        name: "Product 1",
        productCode: "ABC123",
        price: 10,
        quantity: 20,
        description: "A wonderful product",
        isSold: false,
        isActive: true,
        сategory: new CategoryEntity(),
      };

      jest
        .spyOn(repository, "findOne")
        .mockResolvedValueOnce(createProductDto as any);

      try {
        await service.createProduct(createProductDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(
          "The product with this productCode already exists."
        );
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe("updateById", () => {
    it("should update a product if product with provided ID exists", async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: "Updated Product",
        productCode: "ABC123",
        price: 20,
        quantity: 30,
        description: "An updated product",
        isSold: true,
        isActive: true,
      };

      const mockProduct: ProductEntity = {
        id: productId,
        name: "Updated Product",
        productCode: "ABC123",
        price: 20,
        quantity: 30,
        description: "An updated product",
        isSold: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        сategory: null,
        soldAt: undefined,
      };

      jest.spyOn(repository, "findOne").mockResolvedValueOnce(mockProduct);
      jest.spyOn(repository, "save").mockResolvedValueOnce(mockProduct as any);

      const result = await service.updateById(productId, updateProductDto);

      expect(result).toEqual(mockProduct);
    });

    it("should throw an exception if product with provided ID does not exist", async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: "Updated Product",
        productCode: "ABC123",
        price: 20,
        quantity: 30,
        description: "An updated product",
        isSold: true,
        isActive: true,
      };

      jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

      try {
        await service.updateById(productId, updateProductDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Product with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it("should throw an exception if product code already exists", async () => {
      const productId = 1;
      const updateProductDto: UpdateProductDto = {
        name: "Updated Product",
        productCode: "ABC123",
        price: 20,
        quantity: 30,
        description: "An updated product",
        isSold: true,
        isActive: true,
      };

      const existingProduct: ProductEntity = {
        id: productId,
        name: "Updated Product",
        productCode: "ABC123",
        price: 20,
        quantity: 30,
        description: "An updated product",
        isSold: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        сategory: null,
        soldAt: null,
      };

      jest
        .spyOn(repository, "findOne")
        .mockResolvedValueOnce(existingProduct as any);

      try {
        await service.updateById(productId, updateProductDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(
          "The product with this productCode already exists."
        );
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe("deleteById", () => {
    it("should delete a product if product with provided ID exists", async () => {
      const productId = 1;
      const deleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      };

      const mockProduct: ProductEntity = {
        id: productId,
        name: "Product 1",
        productCode: "ABC123",
        price: 10,
        quantity: 20,
        description: "A wonderful product",
        isSold: false,
        isActive: true,
        soldAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        сategory: null,
      };

      jest.spyOn(repository, "findOne").mockResolvedValueOnce(mockProduct);
      jest.spyOn(repository, "delete").mockResolvedValueOnce(deleteResult);

      const result = await service.deleteById(productId);

      expect(result).toEqual(deleteResult);
    });

    it("should throw an exception if product with provided ID does not exist", async () => {
      const productId = 1;

      jest.spyOn(repository, "findOne").mockResolvedValueOnce(undefined);

      try {
        await service.deleteById(productId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Product with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
