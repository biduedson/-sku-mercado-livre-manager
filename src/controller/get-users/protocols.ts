import { Iuser } from "../../models/user";
import { HttpResponse } from "../protocols";

export interface IgetUserController {
  handle(): Promise<HttpResponse<IgetUsersResponse[]>>;
}

export interface IgetUserRepository {
  getUsers(): Promise<IgetUsersResponse[]>;
}

export interface IgetUsersResponse {
  id: number;
  username: string;
  email: string;
}
