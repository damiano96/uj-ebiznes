import axios, {AxiosError} from "axios";
import {ICart} from "../interfaces/ICart";
import {IPayment} from "../interfaces/IPayment";

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async (jwtCode: string): Promise<any[]> => {
    try {
        const response = await axios.get(API_URL + "/products", {headers: {
                'Authorization': 'Bearer ' + jwtCode
            }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const makePayment = async (data: IPayment, jwtCode: string): Promise<any> => {
    try {
        const response = await axios.post(API_URL + '/payment', {...data}, {headers: {
                'Authorization': 'Bearer ' + jwtCode
            }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const getCart = async (jwtCode: string): Promise<ICart[]> => {
    try {
        const response = await axios.get(API_URL + "/cart", {headers: {
                'Authorization': 'Bearer ' + jwtCode
            }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const addToCart = async (id: number, jwtCode: string): Promise<ICart> => {
    try {
        const response = await axios.post(API_URL + "/cart", {id}, {headers: {
            'Authorization': 'Bearer ' + jwtCode
        }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const removeFromCart = async (productID: number, jwtCode: string): Promise<any> => {
    try {
        const response = await axios.delete(API_URL + "/cart/" + productID, {headers: {
                'Authorization': 'Bearer ' + jwtCode
            }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const updateCart = async (cartItem: ICart, jwtCode: string): Promise<any> => {
    try {
        const response = await axios.put(API_URL + "/cart", {...cartItem}, {headers: {
                'Authorization': 'Bearer ' + jwtCode
            }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const clearCart = async (jwtCode: string): Promise<any> => {
    try {
        const response = await axios.delete(API_URL + "/cart", {headers: {
                'Authorization': 'Bearer ' + jwtCode
            }});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const doLogin = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(API_URL + "/login", {email: email, password: password});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}

export const doRegister = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(API_URL + "/register", {email: email, password: password});
        return response.data;
    } catch (error) {
        console.warn(error);
        throw error
    }
}