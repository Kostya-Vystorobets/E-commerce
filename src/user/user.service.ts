import { LoginUserDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { compare } from "bcrypt";

@Injectable()
export class UserSevice {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        userName: loginUserDto.userName,
      },
      { select: ["id", "userName", "password"] }
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
    const userByName = await this.userRepository.findOne({
      userName: createUserDto.userName,
    });
    if (userByName) {
      throw new HttpException(
        "The User with this User Name already exists.",
        HttpStatus.BAD_REQUEST
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }
}
