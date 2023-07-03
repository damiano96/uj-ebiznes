import * as React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {useCart} from "../src/context/hooks/useCart";
import {Payments} from "../src/components/pages/payments/Payments";
import {makePayment} from "../src/services/apiCalls";


jest.mock("../context/hooks/useCart", () => ({
    useCart: jest.fn(),
}));

jest.mock("../services/apiCalls", () => ({
    makePayment: jest.fn(),
}));

describe("Payments", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    test("displays payment form and calculates shop cart price", () => {
        const mockGetShopCartPrice = jest.fn().mockReturnValue(100);
        useCart.mockReturnValue({
            getShopCartPrice: mockGetShopCartPrice,
            clearShopCart: jest.fn(),
        });

        render(
            <BrowserRouter>
                <Payments/>
            </BrowserRouter>);

        const creditCardInput = screen.getByLabelText(/Numer karty kredytowej/i);
        expect(creditCardInput).toBeInTheDocument();

        const totalPrice = screen.getByTestId("price");
        expect(totalPrice).toHaveTextContent("100");

        const paymentButton = screen.getByRole("button", { name: /Zapłać/i });
        expect(paymentButton).toBeInTheDocument();
    });

    test("submits payment form and clears shop cart", async () => {
        const mockClearShopCart = jest.fn();
        const mockGetShopCartPrice = jest.fn().mockReturnValue(100);
        const originalAlert = window.alert;
        window.alert = jest.fn();

        useCart.mockReturnValue({ getShopCartPrice: mockGetShopCartPrice, clearShopCart: mockClearShopCart });

        render(
            <BrowserRouter>
                <Payments/>
            </BrowserRouter>);

        const creditCardInput = screen.getByLabelText(/Numer karty kredytowej/i);
        fireEvent.change(creditCardInput, {
            target: { value: "1234 5678 1234 5678" },
        });

        const paymentButton = screen.getByRole("button", { name: /Zapłać/i });
        fireEvent.click(paymentButton);

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(makePayment).toHaveBeenCalledWith({
            Price: 100,
            CreditCardNumber: 1234567812345678,
        });
        expect(mockClearShopCart).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith("Zamówienie zostało złożone");

        window.alert = originalAlert;
    });
});