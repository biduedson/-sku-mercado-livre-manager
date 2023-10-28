import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IsearchProductsOfSkuController,
  IsearchProductsOfSkuParams,
  IsearchProductsOfSkuRepository
} from "./protocols";

export class SearchProductOfSkuController
  implements IsearchProductsOfSkuController
{
  constructor(
    private readonly searchProductOfSkuRepository: IsearchProductsOfSkuRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<{ params: IsearchProductsOfSkuParams }>
  ): Promise<HttpResponse<Iproducts[]>> {
    try {
      const product = await this.searchProductOfSkuRepository.searcheProduct(
        httpRequest.params
      );
      if (product.length < 1) {
        return {
          statusCode: 404,
          body: "Produto não encontrado."
        };
      }

      return {
        statusCode: 200,
        body: product
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
