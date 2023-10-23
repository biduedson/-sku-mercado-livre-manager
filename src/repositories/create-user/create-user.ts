import bcrypt from "bcrypt";
import {
  IcreateCarrosRepository,
  IcreateUserParams
} from "../../controller/create-user/protocols";
import { knex } from "../../database/conection";
import { User } from "../../models/user";

export class PostgreCreateUserReposirory implements IcreateCarrosRepository {
  async findEmailOrUsernameExist(
    collun: string,
    table: string,
    emailOrUsername: string
  ): Promise<boolean> {
    const find = await knex
      .select(collun)
      .from(table)
      .where(collun, emailOrUsername)
      .first();
    if (find) {
      return true;
    }
    return false;
  }

  async createUser(params: IcreateUserParams): Promise<User> {
    const { password, ...rest } = params;
    const encryptPassWord: string = await bcrypt.hash(password, 10);

    const [user] = await knex<User>("users")
      .insert({ ...rest, password: encryptPassWord })
      .returning("*");

    if (!user) {
      throw new Error("User not created");
    }

    return user;
  }
}
