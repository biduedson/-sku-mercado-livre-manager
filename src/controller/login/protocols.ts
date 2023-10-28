import { HttpRequest, HttpResponse } from "../protocols";

export interface IloginUserController {
  handle(
    httpRequest: HttpRequest<IloginUserParams>
  ): Promise<HttpResponse<IloggedInUser>>;
}

export interface IloginUserParams {
  email: string;
  password: string;
}

export interface IloggedInUser {
  user: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

export interface IloginUserRepository {
  createLogin(params: IloginUserParams): Promise<IloggedInUser>;
  checkEmailandPassword(params: IloginUserParams): Promise<boolean>;
}
