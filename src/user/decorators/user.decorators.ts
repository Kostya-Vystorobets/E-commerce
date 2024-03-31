import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { LoginUserDto } from "../dto/login.dto";
import { UserEntity } from "../user.entity";

export function SwaggerUserApiTags() {
  return applyDecorators(ApiTags("User"));
}

export function SwaggerUserLogin() {
  return applyDecorators(
    ApiOperation({ summary: "Logs user into the system" }),
    ApiOkResponse({
      status: 201,
      description: "User Login",
      type: UserEntity,
    }),
    ApiBadRequestResponse({ description: "User not found" }),
    ApiBody({ type: LoginUserDto })
  );
}

export function SwaggerUserLogout() {
  return applyDecorators(
    ApiOperation({ summary: "Logging out of the system" }),
    ApiCookieAuth(),
    ApiOkResponse({ description: "OK" }),
    ApiUnauthorizedResponse({ description: "Not authorized" })
  );
}

export function SwaggerUserCreate() {
  return applyDecorators(
    ApiOperation({ summary: "Create user" }),
    ApiCookieAuth(),
    ApiBody({ type: LoginUserDto }),
    ApiOkResponse({
      status: 201,
      description: "User Login",
      type: UserEntity,
    }),
    ApiUnauthorizedResponse({ description: "Not authorized" }),
    ApiBadRequestResponse()
  );
}
