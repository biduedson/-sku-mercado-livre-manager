import {
  IUpdateProductsRepository,
  UpdateProductsParams
} from "../../controller/update-products/protocols";
import { knex } from "../../database/conection";
import { Iproducts } from "../../models/products";

export class PostgreeUpdadeProducstRepository
  implements IUpdateProductsRepository
{
  async checkProducExisting(id: number): Promise<boolean> {
    const existingProduct = await knex
      .select("id")
      .from("products")
      .where("id", id)
      .first();

    if (existingProduct) {
      return true;
    }
    return false;
  }
  async checkNameExisting(name: string, id: number): Promise<boolean> {
    const currentProduct = await knex
      .select("name")
      .from("products")
      .where("id", id)
      .first();

    const existingNameProduct = await knex
      .select("name")
      .from("products")
      .where("name", name)
      .first();

    if (existingNameProduct) {
      if (currentProduct.name === existingNameProduct.name) {
        return false;
      }

      return true;
    }
    return false;
  }
  async updateProducts(
    id: number,
    params: UpdateProductsParams
  ): Promise<Iproducts> {
    const product = await knex
      .select("name")
      .from("products")
      .where("id", id)
      .first();

    const UpdateProducts: UpdateProductsParams = {
      name: params.name || product.name,
      description: params.description || product.description,
      price: params.price || product.price,
      stock: params.stock || product.stock,
      sku: params.sku || product.sku,
      category_id: params.category_id || product.category_id
    };

    const [productUpdated] = await knex("products")
      .where({ id })
      .update(UpdateProducts)
      .then(() => {
        return knex("products").where({ id });
      });
    return productUpdated;
  }
}
