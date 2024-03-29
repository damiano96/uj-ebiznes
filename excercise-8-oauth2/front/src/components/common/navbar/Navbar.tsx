import React from "react";
import {Badge, Col, Container, Row} from 'react-bootstrap';
import {BsCart} from "react-icons/bs";
import {Link} from "react-router-dom";
import './style.css';
import {useCart} from "../../../context/hooks/useCart";
import useAuth from "../../../context/hooks/useAuth";

export const Navbar = (): React.JSX.Element => {
    const {shopCart} = useCart();
    const {onLogout} = useAuth();

    const getNumberOfProductsInCart = (): number => {
        return shopCart?.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.Quantity;
        }, 0) || 0;
    }

    return (
        <Container className={'navbar-container'} fluid={true}>
            <Row>
                <Col className={'left-side-nav'}>
                    <Link to={'/'} className={`btn`}>Sklep</Link>
                </Col>
                <Col lg={2}>
                    <Link to={'/cart'} className={`btn`}>
                        <Container>
                            <Row>
                                <Col><BsCart/> <Badge
                                    bg="success">{getNumberOfProductsInCart()}</Badge>
                                </Col>
                            </Row>
                            <Row>
                                <span>Koszyk</span>
                            </Row>
                        </Container>
                    </Link>
                </Col>
                <Col lg={1} className={'left-side-nav'}>
                    <span onClick={() => onLogout()} className={`btn`}>Wyloguj</span>
                </Col>
            </Row>
        </Container>
    )
}