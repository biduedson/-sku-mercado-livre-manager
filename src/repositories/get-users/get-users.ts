import {
  IgetUserRepository,
  IgetUsersResponse
} from "../../controller/get-users/protocols";
import { knex } from "../../database/conection";

export class GetUsersRepository implements IgetUserRepository {
  async getUsers(): Promise<IgetUsersResponse[]> {
    const users = await knex<IgetUsersResponse>("users")
      .select("id", "username", "email")
      .orderBy("id", "asc");
    return users;
  }
}
