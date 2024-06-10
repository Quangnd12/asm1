import { ICustomers } from "./customers.model";
import { IProduct } from "./products.model";

export interface IOrders {
  _id?: string;  
  quantity: string;
  status: string;
  products: IProduct;
  customers: ICustomers;
}
