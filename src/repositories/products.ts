import { HttpMethods } from "../enums/httpMethods";
import { AppUrl } from "../utils/appUrl";
import { ApiService } from "../utils/network/apiServices";

export class ProductsRepo {
  static getProducts = async (id?: string) => {
    const response = await ApiService.getApiResponse(
      id ? `${AppUrl.products}?id=${id}` : AppUrl.products,
      HttpMethods.GET
    );
    return response;
  };
  static addProduct = async (payload: any) => {
    const response = await ApiService.getApiResponse(
      AppUrl.products,
      HttpMethods.POST,
      payload
    );
    return response;
  };
  static deleteProduct = async (id: string) => {
    const response = await ApiService.getApiResponse(
      `${AppUrl.products}/${id}`,
      HttpMethods.DELETE
    );
    return response;
  };
}
