import {
  IDeleteProductParams,
  IDeleteProductRepository
} from "../../controller/delete-product/protocols";
import { knex } from "../../database/conection";

export class DeleteProductRepository implements IDeleteProductRepository {
  async productIfExisting(sku: string): Promise<boolean | void> {
    const product = await knex
      .select("sku")
      .from("products")
      .where("sku", sku)
      .first();
    if (product) {
      return true;
    }
    return false;
  }
  async deleteProduct(params: IDeleteProductParams): Promise<void> {
    const { sku } = params;
    await knex("products").where("sku", sku).del();
  }
}
