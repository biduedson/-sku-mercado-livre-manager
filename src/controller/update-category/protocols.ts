import { Icategory } from "../../models/category";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateCategoryController {
  handle(
    httpRequest: HttpRequest<IUpdateCategoryParams>
  ): Promise<HttpResponse<Icategory>>;
}

export interface IUpdateCategoryParams {
  name: string;
}

export interface IUpdateCategoryRepository {
  updateCategory(id: number, params: IUpdateCategoryParams): Promise<Icategory>;
  checkNameExisting(name: string, id: number): Promise<boolean>;
  checkCategoryExisting(id: number): Promise<boolean>;
}
