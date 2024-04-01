import {
  Body,
  Controller,
  Post,
  UsePipes,
  Session,
  ValidationPipe,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  SwaggerUserApiTags,
  SwaggerUserCreate,
  SwaggerUserLogin,
  SwaggerUserLogout,
} from "./decorators/user.decorators.swagger";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/login.dto";
import { UserSevice } from "./user.service";
import { Session as SessionData } from "express-session";
import { AuthGuard } from "./guards/auth.guard";
import { UserResponseInterface } from "./types/userResponse.interface";
import { use } from "passport";
import { User } from "./decorators/user.decorators";
import { UserEntity } from "./user.entity";

@SwaggerUserApiTags()
@Controller("/api/v2/users")
export class UserController {
  constructor(private readonly userService: UserSevice) {}
  @Post("/login")
  @SwaggerUserLogin()
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post("/")
  @UseGuards(AuthGuard)
  @SwaggerUserCreate()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
