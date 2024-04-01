import { UserType } from "./user.tupe";

export interface UserResponseInterface {
  user: UserType & { token: string };
}
