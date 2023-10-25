import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IgetProductsController {
  handle(): Promise<HttpResponse<Iproducts[]>>;
}

export interface IgetProductsRepository {
  getProducts(): Promise<Iproducts[]>;
}
