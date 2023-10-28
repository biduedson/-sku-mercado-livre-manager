import bcrypt from "bcrypt";
import {
  IcreateUserRepository,
  IcreateUserParams,
  IcreateUserResponse
} from "../../controller/create-user/protocols";
import { knex } from "../../database/conection";
import { Iuser } from "../../models/user";

export class PostgreCreateUserReposirory implements IcreateUserRepository {
  async checkEmail(email: string): Promise<boolean> {
    const find = await knex
      .select("email")
      .from("users")
      .where("email", email)
      .first();
    if (find) {
      return true;
    }
    return false;
  }

  async checkUsername(username: string): Promise<boolean> {
    const find = await knex
      .select("username")
      .from("users")
      .where("username", username)
      .first();
    if (find) {
      return true;
    }
    return false;
  }

  async createUser(params: IcreateUserParams): Promise<IcreateUserResponse> {
    const { password, ...rest } = params;
    const encryptPassWord: string = await bcrypt.hash(password, 10);

    const [user] = await knex<Iuser>("users")
      .insert({ ...rest, password: encryptPassWord })
      .returning(["id", "username", "email"]);

    if (!user) {
      throw new Error("User not created");
    }

    return {
      message: "Usuario cadastrado com sucesso.",
      user
    };
  }
}
