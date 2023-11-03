import { Iuser } from "../../models/user";
import { HttpRequest, HttpResponse, IAuthenticatedUser } from "../protocols";

export interface IUpdateUserController {
  handle(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<Omit<Iuser, "password">>>;
}

export interface IUpdateUserParams {
  username: string;
  email: string;
}

export interface IUpdateUserRepository {
  searchExistingUsername(id: number, username: string): Promise<boolean>;
  searchExistingEmail(id: number, email: string): Promise<boolean>;
  updateUser(
    id: number,
    params: IUpdateUserParams
  ): Promise<Omit<Iuser, "password">>;
}
