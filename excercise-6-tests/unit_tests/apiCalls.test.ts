import axios from "axios";
import {
    getProducts,
    makePayment,
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
} from "../src/services/apiCalls";

jest.mock("axios", () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

describe("apiCalls", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should get products successfully", async () => {
        const mockProducts = [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }];
        axios.get.mockResolvedValueOnce({ data: mockProducts });

        const result = await getProducts();

        expect(axios.get).toHaveBeenCalledWith("http://localhost:1323/products");
        expect(result).toEqual(mockProducts);
    });

    it("should handle error when getting products", async () => {
        const mockError = new Error("Failed to get products");
        axios.get.mockRejectedValueOnce(mockError);

        await expect(getProducts()).rejects.toThrow(mockError);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:1323/products");
    });

    it("should make payment successfully", async () => {
        const mockPaymentData = { amount: 100 };
        axios.post.mockResolvedValueOnce({ data: { success: true } });

        const result = await makePayment(mockPaymentData);

        expect(axios.post).toHaveBeenCalledWith("http://localhost:1323/payment", mockPaymentData);
        expect(result).toEqual({ success: true });
    });

    it("should handle error when making payment", async () => {
        const mockPaymentData = { amount: 100 };
        const mockError = new Error("Failed to make payment");
        axios.post.mockRejectedValueOnce(mockError);

        await expect(makePayment(mockPaymentData)).rejects.toThrow(mockError);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:1323/payment", mockPaymentData);
    });

    it("should get cart successfully", async () => {
        const mockCart = [{ id: 1, productId: 1, quantity: 2 }];
        axios.get.mockResolvedValueOnce({ data: mockCart });

        const result = await getCart();

        expect(axios.get).toHaveBeenCalledWith("http://localhost:1323/cart");
        expect(result).toEqual(mockCart);
    });

});
