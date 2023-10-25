import { Icategory } from "../../models/category";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IcreateCategoryController,
  IcreateCategoryParams,
  IcreateCategoryRepository
} from "./protocols";

export class CreateCategoryController implements IcreateCategoryController {
  constructor(
    private readonly createUserRepository: IcreateCategoryRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<IcreateCategoryParams>
  ): Promise<HttpResponse<Icategory>> {
    try {
      const { name } = httpRequest.body!;
      const findNameCategory =
        await this.createUserRepository.searchExistingCategory(
          "name",
          "categories",
          name
        );

      if (findNameCategory) {
        return {
          statusCode: 400,
          body: "Este nome de categoria ja existe."
        };
      }

      const categories = await this.createUserRepository.createCategory(
        httpRequest.body!
      );
      return {
        statusCode: 201,
        body: categories
      };
    } catch (error) {
      return {
        statusCode: 201,
        body: `Erro interno do servido. ${error})`
      };
    }
  }
}
