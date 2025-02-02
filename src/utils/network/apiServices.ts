import { HttpMethods } from "../../enums/httpMethods";
import { getDataFromAsynStorage } from "./localStorage";
import { AppExceptions } from "./appExceptions";
import { LocalStorageKey } from "../../enums/localStroage";

type HttpMethod =
  | HttpMethods.GET
  | HttpMethods.POST
  | HttpMethods.PUT
  | HttpMethods.DELETE;

interface RequestBody {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
}

export class ApiService {
  static async getApiResponse(url: string, method: HttpMethod, payload?: any) {
    try {
      const requestBody = await this.createRequestBody(method, payload);
      const response = await fetch(url, requestBody);
      return this.handleResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private static async createRequestBody(
    method: HttpMethod,
    payload?: any
  ): Promise<RequestBody> {
    const { data: token } = await getDataFromAsynStorage(LocalStorageKey.TOKEN);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: token || "",
    };
    return method === HttpMethods.GET
      ? { method, headers }
      : { method, headers, body: JSON.stringify(payload) };
  }

  private static async handleResponse(response: Response) {
    const body = await response.json();
    if (response.ok) {
      // Return success response
      return { success: true, data: body };
    }

    // Safely extract errors if they exist
    const errors: string[] = [];

    if (body.error && typeof body.error === "string") {
      errors.push(body.error);
    }

    const message = errors[0];

    // Throw error with explicit failure field
    throw {
      success: false,
      message,
      error: this.getErrorMessage(response.status),
    };
  }

  private static getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return "Bad Request";
      case 404:
        return "Not Found";
      case 422:
        return "Validation Error";
      case 500:
        return "Internal Server Error";
      default:
        return "An unknown error occurred";
    }
  }

  private static handleError(error: unknown): Error {
    if (error instanceof AppExceptions) {
      return error;
    }
    return new Error("An unexpected error occurred");
  }
}
