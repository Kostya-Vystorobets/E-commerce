import { LoginUserDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserResponseInterface } from "./types/userResponse.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      { select: ["id", "email", "userName", "password"] }
    );
    if (!user) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }
    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }
    delete user.password;
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userByEmail) {
      throw new HttpException(
        "The User with this User Email already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
      "SECRET_KEY"
    );
  }
  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }
}
