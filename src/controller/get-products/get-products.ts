import { Iproducts } from "../../models/products";
import { HttpResponse } from "../protocols";
import { IgetProductsController, IgetProductsRepository } from "./protocols";

export class GetProductsController implements IgetProductsController {
  constructor(private readonly getProductsRepository: IgetProductsRepository) {}

  async handle(): Promise<HttpResponse<Iproducts[]>> {
    try {
      const products = await this.getProductsRepository.getProducts();
      return {
        statusCode: 200,
        body: products
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
