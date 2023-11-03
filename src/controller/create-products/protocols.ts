import { Icategory } from "../../models/category";
import { Iproducts } from "../../models/products";
import { IcreateCategoryParams } from "../create-category/protocols";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IcreateProductsController {
  handle(
    httpRequest: HttpRequest<IproductsParams>
  ): Promise<HttpResponse<Iproducts>>;
}

export interface IproductsParams {
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category_id: number;
}

export interface IcreateProductsRepository {
  createProducts(params: IproductsParams): Promise<Iproducts>;
  searchExistingProduts(product: string): Promise<boolean>;
  searchExistingSku(sku: string): Promise<boolean>;
}
