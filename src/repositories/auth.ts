import { HttpMethods } from "../enums/httpMethods";
import { AppUrl } from "../utils/appUrl";
import { ApiService } from "../utils/network/apiServices";

export class AuthRepo {
  static login = async (payload: any) => {
    const response = await ApiService.getApiResponse(
      AppUrl.login,
      HttpMethods.POST,
      payload
    );
    return response;
  };
  static async register(payload: any) {
    const response = await ApiService.getApiResponse(
      AppUrl.users,
      HttpMethods.POST,
      payload
    );
    return response;
  }
}
