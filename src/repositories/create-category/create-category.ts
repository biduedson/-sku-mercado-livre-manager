import { knex } from "../../database/conection";
import {
  IcreateCategoryParams,
  IcreateCategoryRepository
} from "../../controller/create-category/protocols";
import { Icategory } from "../../models/category";

export class PostgreCreateCategoryRepository
  implements IcreateCategoryRepository
{
  async searchExistingCategory(
    collun: string,
    table: string,
    category: string
  ): Promise<boolean> {
    const existingCategory = await knex
      .select(collun)
      .from(table)
      .where(collun, category)
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
