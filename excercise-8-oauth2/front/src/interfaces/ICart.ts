import {IProduct} from "./IProduct";

export interface ICart {
    ID: number,
    Product: IProduct
    Quantity: number
}