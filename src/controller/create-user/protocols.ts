import { Iuser } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IcreateUserController {
  handle(
    httpRequest: HttpRequest<IcreateUserParams>
  ): Promise<HttpResponse<IcreateUserResponse>>;
}

export interface IcreateUserParams {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IcreateUserResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface IencryptPassword {
  encryptPassWord: string;
  salt: number;
}

export interface IcreateUserRepository {
  createUser(params: IcreateUserParams): Promise<IcreateUserResponse>;
  findEmailOrUsernameExist(
    collun: string,
    table: string,
    emailOrUsername: string
  ): Promise<boolean>;
}
