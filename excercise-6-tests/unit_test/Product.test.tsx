import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {Product} from "../src/components/pages/products/Product";
import {useCart} from "../src/context/hooks/useCart";

jest.mock('../context/hooks/useCart', () => ({
    useCart: jest.fn(),
}));


describe('Product', () => {
    const mockAddProductToCart = jest.fn();
    const mockProduct = {
        Name: 'Test Product',
        Price: 10,
        Category: {
            Name: 'Test Category',
        },
    };

    beforeEach(() => {
        useCart.mockReturnValue({
            addProductToCart: mockAddProductToCart,
        });
    });

    test('renders product details correctly', () => {
        render(<Product {...mockProduct} />);

        const nameElement = screen.getByText(/Test Product/i);
        const categoryElement = screen.getByText(/Kategoria: Test Category/i);
        const priceElement = screen.getByText(/Cena: 10/i);

        expect(nameElement).toBeInTheDocument();
        expect(categoryElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
    });

    test('calls addProductToCart when "Dodaj" button is clicked', () => {
        const { getByText } = render(<Product {...mockProduct} />);
        const addButton = getByText('Dodaj');
        fireEvent.click(addButton);
        expect(mockAddProductToCart).toHaveBeenCalledWith(mockProduct);
    });
});