import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IsearchProductsOfSkuController {
  handle(
    httpRequest: HttpRequest<{ params: IsearchProductsOfSkuParams }>
  ): Promise<HttpResponse<Iproducts[]>>;
}

export interface IsearchProductsOfSkuParams {
  sku: string;
}

export interface IsearchProductsOfSkuRepository {
  searcheProduct(params: IsearchProductsOfSkuParams): Promise<Iproducts[]>;
}
