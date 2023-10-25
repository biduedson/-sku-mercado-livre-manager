import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IcreateUserRepository,
  IcreateUserController,
  IcreateUserParams
} from "./protocols";

export class CreateUserController implements IcreateUserController {
  constructor(private readonly createUserRepository: IcreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<IcreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const { username, email } = httpRequest.body!;
      const findUsername =
        await this.createUserRepository.findEmailOrUsernameExist(
          "username",
          "users",
          username
        );

      if (findUsername) {
        return {
          statusCode: 400,
          body: "Este nome de usuario ja existe."
        };
      }
      const findEmail =
        await this.createUserRepository.findEmailOrUsernameExist(
          "email",
          "users",
          email
        );

      if (findEmail) {
        return {
          statusCode: 400,
          body: "Este email ja esta cadastrado."
        };
      }
      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
