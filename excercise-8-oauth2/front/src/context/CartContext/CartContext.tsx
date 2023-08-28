import React from "react";
import { ICartContext } from "./_types";
import {IProduct} from "../../interfaces/IProduct";

export const CartContext = React.createContext<ICartContext>({
    shopCart: [],
    getShopCartPrice: () => 0,
    addProductToCart(product: IProduct): void {},
    clearShopCart(): void {},
    increaseCountOfItem(idProduct: number): void {},
    reduceCountOfItem(idProduct: number): void {},
    removeItemFromCart(idProduct: number): void {},
});
