import axios from "axios";
import {ICart} from "../interfaces/ICart";

const API_URL = "http://localhost:1323";

export const getProducts = async (): Promise<any[]> => {
  try {
    const response = await axios.get(API_URL + "/products");
    return response.data;
  } catch (error) {

    throw error
  }
}

export const makePayment = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(API_URL + '/payment', data);
    return response.data;
  } catch (error) {
    throw error
  }
}

export const getCart = async (): Promise<ICart[]> => {
    try {
        const response = await axios.get(API_URL + "/cart");
        return response.data;
    } catch (error) {
        throw error
    }
}

export const addToCart = async (id: number): Promise<ICart> => {
    try {
        const response = await axios.post(API_URL + "/cart", {id});
        return response.data;
    } catch (error) {
        throw error
    }
}

export const removeFromCart = async (productID: number): Promise<any> => {
    try {
        const response = await axios.delete(API_URL + "/cart/" + productID);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const updateCart = async (cartItem: ICart): Promise<any> => {
    try {
        const response = await axios.put(API_URL + "/cart", {...cartItem});
        return response.data;
    } catch (error) {
        throw error
    }
}