import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IcreateProductsController,
  IcreateProductsRepository,
  IproductsParams
} from "./protocols";

export class CreateProductsController implements IcreateProductsController {
  constructor(
    private readonly createProductsReposytory: IcreateProductsRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<IproductsParams>
  ): Promise<HttpResponse<Iproducts>> {
    try {
      const { name } = httpRequest.body!;

      const nameExisting =
        await this.createProductsReposytory.searchExistingProduts(
          "name",
          "products",
          name
        );

      if (nameExisting) {
        return {
          statusCode: 400,
          body: "Ja existe um produto cadastrado com este nome."
        };
      }

      const products = await this.createProductsReposytory.createProducts(
        httpRequest.body!
      );

      return {
        statusCode: 201,
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
