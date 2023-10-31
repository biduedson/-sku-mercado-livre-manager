import {
  IUpdateCategoryParams,
  IUpdateCategoryRepository
} from "../../controller/update-category/protocols";
import { knex } from "../../database/conection";
import { Icategory } from "../../models/category";

export class PostegreeUpdatCategoryRepository
  implements IUpdateCategoryRepository
{
  async checkCategoryExisting(id: number): Promise<boolean> {
    const checkCategoryExisting = await knex
      .select("id")
      .from("categories")
      .where("id", id)
      .first();

    if (checkCategoryExisting) {
      return true;
    }
    return false;
  }

  async checkNameExisting(name: string, id: number): Promise<boolean> {
    const currentName = await knex
      .select("name")
      .from("categories")
      .where("id", id)
      .first();

    const checkNameExisting = await knex
      .select("name")
      .from("categories")
      .where("name", name)
      .first();

    if (checkNameExisting) {
      if (checkNameExisting.name === currentName.name) {
        return false;
      }
      return true;
    }
    return false;
  }

  async updateCategory(
    id: number,
    params: IUpdateCategoryParams
  ): Promise<Icategory> {
    const currentCategoryName = await knex
      .select("categories")
      .from("categories")
      .where("id", id)
      .first();
    const updatedCategyParams: IUpdateCategoryParams = {
      name: params.name || currentCategoryName.name
    };
    const [categoryUpdated] = await knex("categories")
      .where({ id })
      .update(updatedCategyParams)
      .then(() => {
        return knex("categories").where({ id });
      });

    return categoryUpdated;
  }
}
