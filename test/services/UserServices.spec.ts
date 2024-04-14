import { UserEntity } from "../../src/user/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpException } from "@nestjs/common";
import { UserService } from "../../src/user/user.service";
import { LoginUserDto } from "../../src/user/dto/login.dto";
import { hash } from "bcrypt";
import { faker } from "@faker-js/faker";
import { CreateUserDto } from "../../src/user/dto/createUser.dto";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("UserSevice", () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return user entity after successful login", async () => {
      const loginDto: LoginUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockUser: UserEntity = {
        id: faker.number.int(),
        userName: faker.internet.userName(),
        email: loginDto.email,
        password: await hash(loginDto.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(mockUser);
      const result = await service.login(loginDto);
      expect(result).toEqual(mockUser);
    });

    it("should throw an exception if user is not found", async () => {
      const loginDto: LoginUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(null);
      await expect(service.login(loginDto)).rejects.toThrowError(HttpException);
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

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(mockUser);

      await expect(service.login(loginDto)).rejects.toThrowError(HttpException);
    });
  });

  describe("createUser", () => {
    it("should create a new user and return it after successful creation", async () => {
      const createUserDto: CreateUserDto = {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockUser: UserEntity = {
        id: faker.number.int(),
        userName: createUserDto.userName,
        email: createUserDto.email,
        password: await hash(createUserDto.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(null);
      jest.spyOn(userRepository, "save").mockResolvedValueOnce(mockUser);

      const result = await service.createUser(createUserDto);
      expect(result).toHaveProperty("userName", createUserDto.userName);
      expect(result).toHaveProperty("email", createUserDto.email);
    });

    it("should throw an exception if a user with the provided email already exists", async () => {
      const existingUser: UserEntity = {
        id: faker.number.int(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      const createUserDto: CreateUserDto = {
        userName: faker.internet.userName(),
        email: existingUser.email,
        password: faker.internet.password(),
      };

      jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(existingUser);

      await expect(service.createUser(createUserDto)).rejects.toThrowError(
        HttpException
      );
    });
  });
  describe("buildUserResponse", () => {
    it("should return user response with token", () => {
      const user: UserEntity = {
        id: faker.number.int(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      const result = service.buildUserResponse(user);

      expect(result).toHaveProperty("user");
      expect(result.user).toHaveProperty("id", user.id);
      expect(result.user).toHaveProperty("userName", user.userName);
      expect(result.user).toHaveProperty("email", user.email);
      expect(result.user).toHaveProperty("token");
    });
  });

  describe("generateJwt", () => {
    it("should generate a JWT token", () => {
      const user: UserEntity = {
        id: faker.number.int(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: async function () {
          this.password = await hash(this.password, 10);
        },
      };

      const token = service.generateJwt(user);
      expect(token).toBeDefined();
    });
  });
});
