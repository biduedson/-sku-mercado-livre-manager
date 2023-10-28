import { Icategory } from "../../models/category";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IcreateCategoryController {
  handle(
    httpRequest: HttpRequest<IcreateCategoryParams>
  ): Promise<HttpResponse<Icategory>>;
}

export interface IcreateCategoryParams {
  name: string;
}

export interface IcreateCategoryRepository {
  createCategory(params: IcreateCategoryParams): Promise<Icategory>;
  searchExistingCategory(name: string): Promise<boolean>;
}
