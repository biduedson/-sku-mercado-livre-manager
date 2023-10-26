import { IgetCategoriesRepository } from "../../controller/get-categories/protocols";
import { Icategory } from "../../models/category";
import { knex } from "../../database/conection";

export class GetCategoriesRepository implements IgetCategoriesRepository {
  async getCategories(): Promise<Icategory[]> {
    const categories = await knex<Icategory>("categories");
    return categories;
  }
}
