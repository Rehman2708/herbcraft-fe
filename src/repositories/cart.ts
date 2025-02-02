import { HttpMethods } from "../enums/httpMethods";
import { AppUrl } from "../utils/appUrl";
import { ApiService } from "../utils/network/apiServices";

export class CartRepo {
  static async getCartProducts(userId: string) {
    const response = await ApiService.getApiResponse(
      `${AppUrl.cart}/${userId}`,
      HttpMethods.GET
    );
    return response;
  }
  static async addProductInCart(
    userId: string,
    productId: string,
    quantity: number
  ) {
    const response = await ApiService.getApiResponse(
      `${AppUrl.cart}/add`,
      HttpMethods.POST,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response;
  }
  static async updateProductInCart(
    userId: string,
    productId: string,
    quantity: number
  ) {
    const response = await ApiService.getApiResponse(
      `${AppUrl.cart}/update`,
      HttpMethods.PUT,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response;
  }

  static async deleteProductFromCart(userId: string, productId: string) {
    const response = await ApiService.getApiResponse(
      `${AppUrl.cart}/remove`,
      HttpMethods.DELETE,
      {
        userId,
        productId,
      }
    );
    return response;
  }
}
