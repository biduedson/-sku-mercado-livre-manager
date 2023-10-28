import {
  IsearchProductsOfSkuParams,
  IsearchProductsOfSkuRepository
} from "../../controller/search-product-sku/protocols";
import { Iproducts } from "../../models/products";
import { knex } from "../../database/conection";

export class SearchProductOfSkuRepository
  implements IsearchProductsOfSkuRepository
{
  async searcheProduct(
    params: IsearchProductsOfSkuParams
  ): Promise<Iproducts[]> {
    const { sku } = params;
    const produtc = await knex("products").where("sku", sku);
    return produtc;
  }
}
