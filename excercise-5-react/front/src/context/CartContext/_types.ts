import {IProduct} from "../../interfaces/IProduct";
import {ICart} from "../../interfaces/ICart";

export interface ICartContext {
    shopCart: ICart[]|null,
    addProductToCart: (product: IProduct) => void;
    removeItemFromCart: (idProduct: number) => void;
    increaseCountOfItem: (idProduct: number) => void;
    reduceCountOfItem: (idProduct: number) => void;
    clearShopCart: () => void;
}