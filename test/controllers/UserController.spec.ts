import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, HttpException } from "@nestjs/common";
import { UserController } from "../../src/user/user.controller";
import { UserSevice } from "../../src/user/user.service";
import { LoginUserDto } from "../../src/user/dto/login.dto";
import { UserEntity } from "../../src/user/user.entity";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { faker } from "@faker-js/faker";

describe("UserController", () => {
  let controller: UserController;
  let userService: UserSevice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserSevice,
          useValue: {
            login: jest.fn(),
            buildUserResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserSevice>(UserSevice);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return user data after successful login", async () => {
      const loginDto: LoginUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockUser: UserEntity = {
        id: faker.number.int(),
        userName: faker.internet.userName(),
        email: loginDto.email,
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      const mockToken = sign({ userId: mockUser.id }, "secretKey", {
        expiresIn: "1h",
      });

      jest.spyOn(userService, "login").mockResolvedValueOnce(mockUser);

      const buildUserResponseSpy = jest.spyOn(userService, "buildUserResponse");
      buildUserResponseSpy.mockReturnValueOnce({
        user: {
          ...mockUser,
          token: mockToken,
        },
      });

      const result = await controller.login(loginDto);

      expect(result).toBeDefined();
      expect(result.user.token).toBe(mockToken);
      expect(buildUserResponseSpy).toHaveBeenCalledWith(mockUser);
    });

    it("should throw an exception if user is not found", async () => {
      const loginDto: LoginUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      jest.spyOn(userService, "login").mockResolvedValueOnce(null);

      try {
        await controller.login(loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("User not found");
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    it("should throw an exception if password is incorrect", async () => {
      const loginDto: LoginUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockUser: UserEntity = {
        id: faker.number.int(),
        userName: faker.internet.userName(),
        email: loginDto.email,
        password: await hash(faker.internet.password(), 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      jest.spyOn(userService, "login").mockResolvedValueOnce(mockUser);

      try {
        await controller.login(loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe("Invalid credentials");
        expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });
});
