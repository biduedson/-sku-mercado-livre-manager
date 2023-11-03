import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IDeleteProductController,
  IDeleteProductParams,
  IDeleteProductRepository
} from "./protocols";

export class DeletePtoductController implements IDeleteProductController {
  constructor(
    private readonly deleProductRepository: IDeleteProductRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<{ params: IDeleteProductParams }>
  ): Promise<HttpResponse<Iproducts>> {
    try {
      const { sku } = httpRequest.params;
      const product = await this.deleProductRepository.productIfExisting(sku);
      if (!product) {
        return {
          statusCode: 404,
          body: "Produto não encontrado."
        };
      }
      await this.deleProductRepository.deleteProduct(httpRequest.params!);

      return {
        statusCode: 200,
        body: "arquivo excluido com sucesso!"
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
