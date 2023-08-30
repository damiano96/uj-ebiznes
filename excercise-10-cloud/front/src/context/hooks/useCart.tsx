import React from "react";
import { CartContext } from "../CartContext/CartContext";

export const useCart = () => {
    return React.useContext(CartContext)
}