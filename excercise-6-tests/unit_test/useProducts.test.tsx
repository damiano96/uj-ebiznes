import { renderHook, act } from '@testing-library/react';
import {useProducts} from "../src/components/pages/products/hooks/useProducts";
import {getProducts} from "../src/services/apiCalls";

jest.mock('../services/apiCalls', () => ({
    getProducts: jest.fn(),
}));

describe('useProducts', () => {
    const mockProducts = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('returns correct initial values', async () => {
        getProducts.mockResolvedValue(mockProducts);

        const {result} = renderHook(() => useProducts());

        expect(result.current.products).toEqual([]);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.products).toEqual(mockProducts);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    test('fetches products successfully', async () => {
        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(getProducts).toHaveBeenCalledTimes(1);
        expect(result.current.products).toEqual(mockProducts);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    test('sets error when fetch fails', async () => {
        const errorMessage = 'Coś poszło nie tak';
        getProducts.mockRejectedValue(errorMessage);

        const { result } = renderHook(() => useProducts());

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(getProducts).toHaveBeenCalledTimes(1);
        expect(result.current.products).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(errorMessage);
    });
});