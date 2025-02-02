import { IProduct } from "./products";

interface OrderProduct {
  product: IProduct;
  quantity: number;
  _id: string;
}

export interface IOrders {
  address: string;
  createdAt: Date;
  paymentType: string;
  products: OrderProduct[];
  status: string;
  totalPrice: number;
  totalItems: number;
  phoneNumber: number;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export interface IOrdersResponse {
  data: IOrders[];
}
