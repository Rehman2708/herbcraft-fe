import { HttpMethods } from "../enums/httpMethods";
import { AppUrl } from "../utils/appUrl";
import { ApiService } from "../utils/network/apiServices";

export class OrdersRepo {
  static async createOrder(payload: any) {
    const response = await ApiService.getApiResponse(
      AppUrl.order,
      HttpMethods.POST,
      payload
    );
    return response;
  }
  static async getOrders(id: string) {
    const response = await ApiService.getApiResponse(
      `${AppUrl.order}/user/${id}`,
      HttpMethods.GET
    );
    return response;
  }
  static async getOrderDetails(id: string) {
    const response = await ApiService.getApiResponse(
      `${AppUrl.order}/${id}`,
      HttpMethods.GET
    );
    return response;
  }
}
