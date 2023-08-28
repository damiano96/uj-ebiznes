import React, {useMemo, useState} from "react";
import { CartContext } from "./CartContext";
import {addToCart, clearCart, getCart, removeFromCart, updateCart} from "../../services/apiCalls";
import {ICart} from "../../interfaces/ICart";
import {IProduct} from "../../interfaces/IProduct";
import useAuth from "../hooks/useAuth";

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const {user} = useAuth();
    const [shopCart, setShopCart] = useState<ICart[]>([]);

    React.useEffect(() => {
        getCart(getJwToken()).then(data => setShopCart(data));
    }, []);

    const getJwToken = (): string => {
        return user?.token || '';
    }

    const getShopCartPrice = (): number => {
        return shopCart?.reduce((previousValue, currentValue) => {
            return previousValue + (currentValue.Quantity * currentValue.Product.Price)
        }, 0) || 0;
    }

    const addProductToCart = (product: IProduct): void => {
        const actualShopCart: ICart[] = [...shopCart];
        const productIndex = actualShopCart.findIndex(cartProduct => cartProduct.Product.ID === product.ID);

        addToCart(product.ID, getJwToken()).then((cart) => {
            if (productIndex !== -1) {
                actualShopCart[productIndex].Quantity += 1;
            } else {
                actualShopCart.push({Product: cart.Product, Quantity: cart.Quantity, ID: cart.ID})
            }

            setShopCart(actualShopCart);
        })
    }

    const clearShopCart = (): void => {
        clearCart(getJwToken()).then(r => setShopCart([]));
    }

    const increaseCountOfItem = (idProduct: number): void => {
        const actualShopCart: ICart[] = [...shopCart];
        const productIndex = actualShopCart.findIndex(cartProduct => cartProduct.ID === idProduct);
        actualShopCart[productIndex].Quantity += 1;
        updateCart(actualShopCart[productIndex], getJwToken())
            .then(data => setShopCart(actualShopCart));
    }

    const reduceCountOfItem = (idProduct: number): void => {
        const actualShopCart: ICart[] = [...shopCart];
        const productIndex = actualShopCart.findIndex(cartProduct => cartProduct.ID === idProduct);

        if (actualShopCart[productIndex].Quantity > 1) {
            actualShopCart[productIndex].Quantity -= 1;
            updateCart(actualShopCart[productIndex], getJwToken())
                .then(data => setShopCart(actualShopCart));

        }

    }

    const removeItemFromCart = (idProduct: number): void => {
        const actualShopCart: ICart[] = [...shopCart];
        const productIndex = actualShopCart.findIndex(cartProduct => cartProduct.ID === idProduct);

        if (productIndex !== -1) {
            removeFromCart(actualShopCart[productIndex].Product.ID, getJwToken()).then(data => {
                actualShopCart.splice(productIndex, 1);
                setShopCart(actualShopCart);
            });
        }
    }

    const providerValues = useMemo(() => ({
        shopCart,
        addProductToCart,
        clearShopCart,
        increaseCountOfItem,
        reduceCountOfItem,
        removeItemFromCart,
        getShopCartPrice
    }), [shopCart]);

    return (
         <CartContext.Provider value={providerValues}>
             {children}
         </CartContext.Provider>
    )
}