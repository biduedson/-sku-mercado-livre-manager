import { knex } from "../../database/conection";
import {
  IcreateProductsRepository,
  IproductsParams
} from "../../controller/create-products/protocols";
import { Iproducts } from "../../models/products";

export class PostgreCreateProductsRepository
  implements IcreateProductsRepository
{
  async searchExistingProduts(product: string): Promise<boolean> {
    const existingProducts = await knex
      .select("name")
      .from("products")
      .where("name", product)
      .first();

    if (existingProducts) {
      return true;
    }

    return false;
  }
  async searchExistingSku(sku: string): Promise<boolean> {
    const existingSku = await knex
      .select("sku")
      .from("products")
      .where("sku", sku)
      .first();

    if (existingSku) {
      return true;
    }
    return false;
  }
  async createProducts(params: IproductsParams): Promise<Iproducts> {
    const [products] = await knex<Iproducts>("products")
      .insert(params)
      .returning("*");

    return products;
  }
}
