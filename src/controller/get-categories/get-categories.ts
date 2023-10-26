import { Icategory } from "../../models/category";
import {
  IcreateCategoryController,
  IcreateCategoryParams
} from "../create-category/protocols";
import { HttpRequest, HttpResponse } from "../protocols";
import { IgetCategoriesControler, IgetCategoriesRepository } from "./protocols";

export class GetCAtegoriesController implements IgetCategoriesControler {
  constructor(
    private readonly getCategoriesRepository: IgetCategoriesRepository
  ) {}
  async handle(): Promise<HttpResponse<Icategory[]>> {
    try {
      const categories = await this.getCategoriesRepository.getCategories();
      return {
        statusCode: 200,
        body: categories
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro interno do servidor. ${error}`
      };
    }
  }
}
