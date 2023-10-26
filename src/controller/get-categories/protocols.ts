import { Icategory } from "../../models/category";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IgetCategoriesControler {
  handle(): Promise<HttpResponse<Icategory[]>>;
}

export interface IgetCategoriesRepository {
  getCategories(): Promise<Icategory[]>;
}
