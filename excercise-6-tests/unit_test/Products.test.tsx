import React from 'react';
import { render, screen } from '@testing-library/react';
import {Products} from "../src/components/pages/products/Products";
import {useProducts} from "../src/components/pages/products/hooks/useProducts";


jest.mock('../components/pages/products/hooks/useProducts', () => ({
    useProducts: jest.fn(),
}));

describe('Products', () => {
    test('renders product list when data is loaded', () => {
        const mockProducts = [
            { ID: 1, Name: 'Product 1', Price: 10, Category: { Name: 'Category 1' } },
            { ID: 2, Name: 'Product 2', Price: 20, Category: { Name: 'Category 2' } },
        ];
        useProducts.mockReturnValue({
            products: mockProducts,
            isLoading: false,
            error: null,
        });

        render(<Products />);

        const product1 = screen.getByText('Product 1');
        const product2 = screen.getByText('Product 2');
        expect(product1).toBeInTheDocument();
        expect(product2).toBeInTheDocument();
    });

    test('renders loader when data is loading', () => {
        useProducts.mockReturnValue({
            products: [],
            isLoading: true,
            error: null,
        });

        render(<Products />);

        const loader = screen.getByRole('status');
        expect(loader).toBeInTheDocument();
    });

    test('renders error message when there is an error', () => {
        const mockError = 'An error occurred.';
        useProducts.mockReturnValue({
            products: [],
            isLoading: false,
            error: mockError,
        });

        render(<Products />);

        const errorMessage = screen.getByText('Wsytapil pewien blad');
        expect(errorMessage).toBeInTheDocument();
    });
});