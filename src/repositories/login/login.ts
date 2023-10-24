import { knex } from "../../database/conection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  IloggedInUser,
  IloginUserParams,
  IloginUserRepository
} from "../../controller/login/protocols";

export class LoginUser implements IloginUserRepository {
  async checkEmailandPassword(params: IloginUserParams): Promise<boolean> {
    const { email } = params;
    const user = await knex("users").where({ email }).first();

    if (!user) {
      return false;
    }

    const passwordValidate = await bcrypt.compare(
      params.password,
      user.password
    );
    if (!passwordValidate) {
      return false;
    }
    return true;
  }

  async createLogin(params: IloginUserParams): Promise<IloggedInUser> {
    const { email } = params;

    const userfind = await knex("users").where({ email }).first();
    const token = jwt.sign({ id: userfind.id }, String(process.env.JWT_PASS), {
      expiresIn: "8h"
    });

    const user: IloggedInUser = {
      user: {
        id: userfind.id,
        username: userfind.username,
        email: userfind.email
      },
      token: token
    };
    return user;
  }
}
