import { IgetProductsRepository } from "../../controller/get-products/protocols";
import { Iproducts } from "../../models/products";
import { knex } from "../../database/conection";

export class GetProductsRepository implements IgetProductsRepository {
  async getProducts(): Promise<Iproducts[]> {
    const products = await knex<Iproducts>("products").orderBy("id", "asc");
    return products;
  }
}
