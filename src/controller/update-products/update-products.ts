import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateProductsRepository,
  IUpdateUserController,
  UpdateProductsParams
} from "./protocols";

export class UpdateProductsController implements IUpdateUserController {
  constructor(
    private readonly updateProductsRepository: IUpdateProductsRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateProductsParams>
  ): Promise<HttpResponse<Iproducts>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest.body;
      const { name } = httpRequest.body!;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id de usuário ausente."
        };
      }
      const checkProducExisting =
        await this.updateProductsRepository.checkProducExisting(id);

      if (!checkProducExisting) {
        return {
          statusCode: 404,
          body: `Produto não encontrado.`
        };
      }
      const chekcNameExisting =
        await this.updateProductsRepository.checkNameExisting(name, id);
      if (chekcNameExisting) {
        return {
          statusCode: 400,
          body: "Este nome ja esta cadastrado em outro produto ."
        };
      }

      const user = await this.updateProductsRepository.updateProducts(
        id,
        body!
      );

      return {
        statusCode: 200,
        body: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
