import { HttpRequest, HttpResponse } from "../protocols";
import {
  IloggedInUser,
  IloginUserController,
  IloginUserParams,
  IloginUserRepository
} from "./protocols";

export class Logincontroller implements IloginUserController {
  constructor(private readonly loginUserRepository: IloginUserRepository) {}
  async handle(
    httpRequest: HttpRequest<IloginUserParams>
  ): Promise<HttpResponse<IloggedInUser>> {
    try {
      const { email, password } = httpRequest.body!;

      const checkEmailAndPass =
        await this.loginUserRepository.checkEmailandPassword({
          email: email,
          password: password
        });

      if (!checkEmailAndPass) {
        return {
          statusCode: 400,
          body: "Email ou senha incorretos."
        };
      }

      const userLogged = await this.loginUserRepository.createLogin(
        httpRequest.body!
      );

      return {
        statusCode: 200,
        body: userLogged
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor.  ${error}`
      };
    }
  }
}
