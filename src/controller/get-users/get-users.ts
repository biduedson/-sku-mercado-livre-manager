import { Iuser } from "../../models/user";
import { HttpResponse } from "../protocols";
import {
  IgetUserController,
  IgetUserRepository,
  IgetUsersResponse
} from "./protocols";

export class GetUsersController implements IgetUserController {
  constructor(private readonly getUsersRepository: IgetUserRepository) {}
  async handle(): Promise<HttpResponse<IgetUsersResponse[]>> {
    try {
      const users = await this.getUsersRepository.getUsers();
      return {
        statusCode: 200,
        body: users
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
