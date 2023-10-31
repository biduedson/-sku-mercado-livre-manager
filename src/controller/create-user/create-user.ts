import { createUserSchema } from "../../validations/schemes/create-user-scheme/create-user-scheme";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IcreateUserRepository,
  IcreateUserController,
  IcreateUserParams,
  IcreateUserResponse
} from "./protocols";

export class CreateUserController implements IcreateUserController {
  constructor(private readonly createUserRepository: IcreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<IcreateUserParams>
  ): Promise<HttpResponse<IcreateUserResponse>> {
    try {
      const { error } = createUserSchema.validate(httpRequest.body!);

      if (error) {
        return {
          statusCode: 400,
          body: error.details[0].message
        };
      }
      const { username, email } = httpRequest.body!;

      const checkUsername = await this.createUserRepository.checkUsername(
        username
      );

      if (checkUsername) {
        return {
          statusCode: 400,
          body: "Este nome de usuario ja esta cadastrado."
        };
      }

      const checkEmail = await this.createUserRepository.checkEmail(email);

      if (checkEmail) {
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
