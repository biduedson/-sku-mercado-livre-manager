import { knex } from "../../database/conection";
import {
  IcreateCategoryParams,
  IcreateCategoryRepository
} from "../../controller/create-category/protocols";
import { Icategory } from "../../models/category";

export class PostgreCreateCategoryRepository
  implements IcreateCategoryRepository
{
  async searchExistingCategory(name: string): Promise<boolean> {
    const existingCategory = await knex
      .select("name")
      .from("categories")
      .where("name", name)
      .first();
    if (existingCategory) {
      return true;
    }
    return false;
  }

  async createCategory(params: IcreateCategoryParams): Promise<Icategory> {
    const { name } = params;
    const [category] = await knex<Icategory>("categories")
      .insert({ name })
      .returning("*");

    return category;
  }
}
