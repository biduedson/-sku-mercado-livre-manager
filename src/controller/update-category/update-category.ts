import { Icategory } from "../../models/category";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateCategoryController,
  IUpdateCategoryParams,
  IUpdateCategoryRepository
} from "./protocols";

export class UpdateCategoryController implements IUpdateCategoryController {
  constructor(
    private readonly updateCategoryRepository: IUpdateCategoryRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<IUpdateCategoryParams>
  ): Promise<HttpResponse<Icategory>> {
    try {
      const id = httpRequest?.params?.id;

      const { name } = httpRequest.body!;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id da cateroria ausente."
        };
      }

      const checkCategoryExisting =
        await this.updateCategoryRepository.checkCategoryExisting(id);

      if (!checkCategoryExisting) {
        return {
          statusCode: 404,
          body: "Categoria não encontrada"
        };
      }
      const checkNameExisting =
        await this.updateCategoryRepository.checkNameExisting(name, id);

      if (checkNameExisting) {
        return {
          statusCode: 400,
          body: "Este nome ja esta cadastrado em outra categoria."
        };
      }

      const updatedCategory =
        await this.updateCategoryRepository.updateCategory(
          id,
          httpRequest.body!
        );

      return {
        statusCode: 200,
        body: updatedCategory
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
