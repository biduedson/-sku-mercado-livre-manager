import { Iproducts } from "../../models/products";
import { Iuser } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateUserController {
  handle(
    httpRequest: HttpRequest<UpdateProductsParams>
  ): Promise<HttpResponse<Iproducts>>;
}

export interface UpdateProductsParams {
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category_id: number;
}

export interface IUpdateProductsRepository {
  updateProducts(id: number, params: UpdateProductsParams): Promise<Iproducts>;
  checkNameExisting(name: string, id: number): Promise<boolean>;
  checkProducExisting(id: number): Promise<boolean>;
}
