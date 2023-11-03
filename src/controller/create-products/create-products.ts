import { Iproducts } from "../../models/products";
import { iCreateProductsSchema } from "../../validations/schemes/create-products-scheme/creste-products-scheme";
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
      const { error } = iCreateProductsSchema.validate(httpRequest.body);

      if (error) {
        return {
          statusCode: 400,
          body: error.details[0].message
        };
      }
      const { name, sku } = httpRequest.body!;

      const nameExisting =
        await this.createProductsReposytory.searchExistingProduts(name);

      if (nameExisting) {
        return {
          statusCode: 400,
          body: "Ja existe um produto cadastrado com este nome."
        };
      }

      const skuExisting = await this.createProductsReposytory.searchExistingSku(
        sku
      );

      if (skuExisting) {
        return {
          statusCode: 400,
          body: "Ja existe um produto cadastrado com este SKU."
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
