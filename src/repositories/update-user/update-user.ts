import {
  IUpdateUserParams,
  IUpdateUserRepository
} from "../../controller/update-user/protocols";
import { Iuser } from "../../models/user";
import { knex } from "../../database/conection";

export class UpdateUserRepository implements IUpdateUserRepository {
  async searchExistingUsername(id: number, username: string): Promise<boolean> {
    const checkUsernameExisting = await knex("users").where({ id }).first();

    if (checkUsernameExisting) {
      if (checkUsernameExisting.username === username) {
        return false;
      }
      return true;
    }
    return false;
  }

  async searchExistingEmail(id: number, email: string): Promise<boolean> {
    const checkEmailExisting = await knex("users").where({ id }).first();

    if (checkEmailExisting) {
      if (checkEmailExisting.email === email) {
        return false;
      }
      return true;
    }
    return false;
  }

  async updateUser(
    id: number,
    params: IUpdateUserParams
  ): Promise<Omit<Iuser, "password">> {
    const currentUser = await knex("users").where("id", id).first();
    const updatedParams: IUpdateUserParams = {
      username: params.username || currentUser.username,
      email: params.email || currentUser.email
    };

    const userUpdated = await knex("users")
      .where({ id })
      .update(updatedParams)
      .then(() => {
        return knex("users").where({ id }).first();
      });

    return {
      id: userUpdated.id,
      username: userUpdated.username,
      email: userUpdated.email
    };
  }
}
