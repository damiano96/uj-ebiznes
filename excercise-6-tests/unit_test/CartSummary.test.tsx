import React from 'react';
import { render, screen } from "@testing-library/react";
import {CartSummary} from "../src/components/pages/cart/CartSummary";
import {useCart} from "../src/context/hooks/useCart";
import {BrowserRouter, Link} from "react-router-dom";

jest.mock("../context/hooks/useCart", () => ({
    useCart: jest.fn(),
}));

describe("CartSummary", () => {
    test("displays cart summary with final price", () => {
        const mockGetShopCartPrice = jest.fn().mockReturnValue(100);
        useCart.mockReturnValue({
            getShopCartPrice: mockGetShopCartPrice
        });

        render(
            <BrowserRouter>
                <CartSummary/>
            </BrowserRouter>
        );

        const totalPrice = screen.getByText("Cena końcowa: 100zł");
        expect(totalPrice).toBeInTheDocument();
    });

    test("renders 'Złoż zamówienie' button", () => {
        useCart.mockReturnValue({
            getShopCartPrice: jest.fn(),
        });

        render(
            <BrowserRouter>
                <CartSummary/>
            </BrowserRouter>
        );

        const orderButton = screen.getByRole('button', {name: /Zamów/i});
        expect(orderButton).toBeInTheDocument();
    });
});