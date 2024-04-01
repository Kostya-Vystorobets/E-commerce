import { UserSevice } from "./../user/user.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { ExpressRequestInterface } from "src/types/expressRequest.interface";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userSevice: UserSevice) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = verify(token, "SECRET_KEY");
      if (typeof decode === "object" && "id" in decode) {
        const user = await this.userSevice.findById(decode.id);
        req.user = user;
      } else {
        req.user = null;
      }
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
