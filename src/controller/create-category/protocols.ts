import { Icategory } from "../../models/category";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IcreateCategoryController {
  handle(
    httpRequest: HttpRequest<IcreateCategoryParams>
  ): Promise<HttpResponse<Icategory>>;
}

export interface IcreateCategoryParams {
  id: number;
  name: string;
}

export interface IcreateCategoryRepository {
  createCategory(params: IcreateCategoryParams): Promise<Icategory>;
  searchExistingCategory(
    collun: string,
    table: string,
    category: string
  ): Promise<boolean>;
}
