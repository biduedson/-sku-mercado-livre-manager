import { Iproducts } from "../../models/products";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteProductController {
  handle(
    httpRequest: HttpRequest<{ params: IDeleteProductParams }>
  ): Promise<HttpResponse<Iproducts>>;
}

export interface IDeleteProductParams {
  sku: string;
}

export interface IDeleteProductRepository {
  deleteProduct(params: IDeleteProductParams): Promise<void>;
  productIfExisting(sku: string): Promise<boolean | void>;
}
