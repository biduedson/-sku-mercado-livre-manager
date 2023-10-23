import { string } from "joi";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IcreateUserController {
  handle(
    httpRequest: HttpRequest<IcreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface IcreateUserParams {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IencryptPassword {
  encryptPassWord: string;
  salt: number;
}

export interface IcreateCarrosRepository {
  createUser(params: IcreateUserParams): Promise<User>;
  findEmailOrUsernameExist(
    collun: string,
    table: string,
    emailOrUsername: string
  ): Promise<boolean>;
}
