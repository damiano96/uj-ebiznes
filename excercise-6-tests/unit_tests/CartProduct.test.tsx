import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {IProduct} from "../src/interfaces/IProduct";
import {ICart} from "../src/interfaces/ICart";
import {useCart} from "../src/context/hooks/useCart";
import {CartProduct} from "../src/components/pages/cart/CartProduct";


jest.mock('../context/hooks/useCart', () => ({
    useCart: jest.fn(),
}));

describe('CartProduct', () => {
    const mockProduct: IProduct = {
        ID: 1,
        Name: 'Test Product',
        Price: 10,
        Category: {
            Name: 'Test Category',
        },
    };

    const mockCart: ICart = {
        ID: 1,
        Product: mockProduct,
        Quantity: 2,
    };

    test('renders product name', () => {
        useCart.mockReturnValue({
            increaseCountOfItem: jest.fn(),
            reduceCountOfItem: jest.fn(),
            removeItemFromCart: jest.fn(),
        });

        render(<CartProduct {...mockCart} />);

        const productName = screen.getByText('Test Product');
        expect(productName).toBeInTheDocument();
    });

    test('calls reduceCountOfItem when "-" button is clicked', () => {
        const mockReduceCountOfItem = jest.fn();
        useCart.mockReturnValue({
            increaseCountOfItem: jest.fn(),
            reduceCountOfItem: mockReduceCountOfItem,
            removeItemFromCart: jest.fn(),
        });

        render(<CartProduct {...mockCart} />);

        const minusButton = screen.getByText('-');
        fireEvent.click(minusButton);

        expect(mockReduceCountOfItem).toHaveBeenCalledWith(1);
    });

    test('calls increaseCountOfItem when "+" button is clicked', () => {
        const mockIncreaseCountOfItem = jest.fn();
        useCart.mockReturnValue({
            increaseCountOfItem: mockIncreaseCountOfItem,
            reduceCountOfItem: jest.fn(),
            removeItemFromCart: jest.fn(),
        });

        render(<CartProduct {...mockCart} />);

        const plusButton = screen.getByText('+');
        fireEvent.click(plusButton);

        expect(mockIncreaseCountOfItem).toHaveBeenCalledWith(1);
    });

    test('calls removeItemFromCart when trash button is clicked', () => {
        const mockRemoveItemFromCart = jest.fn();
        useCart.mockReturnValue({
            increaseCountOfItem: jest.fn(),
            reduceCountOfItem: jest.fn(),
            removeItemFromCart: mockRemoveItemFromCart,
        });

        render(<CartProduct {...mockCart} />);

        const trashButton = screen.getByTestId('trash-button');
        fireEvent.click(trashButton);

        expect(mockRemoveItemFromCart).toHaveBeenCalledWith(1);
    });

    test('displays correct product price', () => {
        useCart.mockReturnValue({
            increaseCountOfItem: jest.fn(),
            reduceCountOfItem: jest.fn(),
            removeItemFromCart: jest.fn(),
        });

        render(<CartProduct {...mockCart} />);

        const productPrice = screen.getByText('10');
        expect(productPrice).toBeInTheDocument();
    });

    test('displays correct current product price', () => {
        useCart.mockReturnValue({
            increaseCountOfItem: jest.fn(),
            reduceCountOfItem: jest.fn(),
            removeItemFromCart: jest.fn(),
        });

        render(<CartProduct {...mockCart} />);

        const currentProductPrice = screen.getByText('20');
        expect(currentProductPrice).toBeInTheDocument();
    });
});