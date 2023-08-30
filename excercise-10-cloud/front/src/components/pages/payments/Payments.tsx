import React from "react";
import {makePayment} from "../../../services/apiCalls";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useCart} from "../../../context/hooks/useCart";
import {useNavigate} from "react-router-dom";
import useAuth from "../../../context/hooks/useAuth";

export const Payments = (): React.JSX.Element => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const {getShopCartPrice, clearShopCart} = useCart();
    const [creditCard, setCreditCart] = React.useState<string>('');

    const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const creditCardNumber = Number(creditCard);

        try {
            await makePayment({
                Price: getShopCartPrice(),
                CreditCardNumber: creditCardNumber
            }, user?.token || '');
        } catch (e) {
            alert('Wystąpił błąd podczas płatności');
            return;
        }

        clearShopCart();

        alert('Zamówienie zostało złożone');
        navigate('/');
    }

    return (
        <Container>
            <Row style={{marginBottom: '40px'}}>
                <span className={'display-6'}>Płatności</span>
            </Row>
            <Row>
                <Form onSubmit={onHandleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="creditCardNumber">
                            <Form.Label>Numer karty kredytowej</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="1234 5678 1234 5678"
                                value={creditCard}
                                onChange={(event) => {
                                    const value = (event.target as HTMLInputElement)
                                        .value
                                        .replaceAll(' ', '');

                                    setCreditCart(value);
                                }}
                            />
                        </Form.Group>
                    </Row>
                    <Row className={'mt-4 mb-4'}>
                        <Col>
                            <h5>Kwota do zapłaty: </h5>
                            <h6 data-testid={'price'}>{getShopCartPrice()}</h6>
                        </Col>
                    </Row>
                    <Button type={'submit'}>Zapłać</Button>
                </Form>
            </Row>
        </Container>
    )
}