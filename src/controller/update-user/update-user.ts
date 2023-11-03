import { Iuser } from "../../models/user";
import { updateUserSchema } from "../../validations/schemes/update-user/updateUser";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserParams,
  IUpdateUserRepository
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<Omit<Iuser, "password">>> {
    try {
      const { error } = updateUserSchema.validate(httpRequest.body);
      if (error) {
        return {
          statusCode: 400,
          body: error.details[0].message
        };
      }
      const user = httpRequest.user!;
      const body = httpRequest.body!;
      const existingUsername =
        await this.updateUserRepository.searchExistingUsername(
          user.id,
          body.username
        );

      if (existingUsername) {
        return {
          statusCode: 400,
          body: "Este username ja esta sendo usado por outro usuario."
        };
      }

      const existingEmail = await this.updateUserRepository.searchExistingEmail(
        user.id,
        body.email
      );

      if (existingEmail) {
        return {
          statusCode: 400,
          body: "Este email ja esta sendo usado por outro usuario."
        };
      }

      const userUpdated = await this.updateUserRepository.updateUser(
        user.id,
        body
      );

      return {
        statusCode: 200,
        body: userUpdated
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
