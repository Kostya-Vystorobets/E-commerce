import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Admin" })
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "dc27ed128c2a755db896a663" })
  readonly password: string;
}
