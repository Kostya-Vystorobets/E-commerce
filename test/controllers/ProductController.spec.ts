import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "../../src/product/product.controller";
import { ProductService } from "../../src/product/product.service";
import { ProductEntity } from "../../src/product/product.entity";
import { UpdateProductDto } from "../../src/product/dto/updateProduct.dto";
import { HttpStatus, HttpException } from "@nestjs/common";

describe("ProductController", () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getById: jest.fn(),
            createProduct: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("should return product by ID", async () => {
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

      jest.spyOn(productService, "getById").mockResolvedValueOnce(mockProduct);

      const result = await controller.getById(1);

      expect(result).toEqual(mockProduct);
    });
    it("should return product by ID if product exists", async () => {
      const productId = 1;
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

      jest.spyOn(productService, "getById").mockResolvedValueOnce(mockProduct);

      const result = await controller.getById(productId);

      expect(result).toEqual(mockProduct);
    });
    it("should throw an exception if product with the provided ID does not exist", async () => {
      const productId = 1;

      jest
        .spyOn(productService, "getById")
        .mockRejectedValueOnce(
          new HttpException(
            "The Product with this ID was not found.",
            HttpStatus.NOT_FOUND
          )
        );

      try {
        await controller.getById(productId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Product with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe("updateById", () => {
    it("should update a product and return updated product data after successful update", async () => {
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
        soldAt: null,
      };

      jest
        .spyOn(productService, "updateById")
        .mockResolvedValueOnce(mockProduct);

      const result = await controller.updeteById(productId, updateProductDto);

      expect(result).toEqual(mockProduct);
    });

    it("should throw an exception if product with the provided ID does not exist", async () => {
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

      jest
        .spyOn(productService, "updateById")
        .mockRejectedValueOnce(
          new HttpException(
            "The Product with this ID was not found.",
            HttpStatus.NOT_FOUND
          )
        );

      try {
        await controller.updeteById(productId, updateProductDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("The Product with this ID was not found.");
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
