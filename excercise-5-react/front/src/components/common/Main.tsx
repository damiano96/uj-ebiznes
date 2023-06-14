import React from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import './style.css'
import {Navbar} from "./navbar/Navbar";
import {CartProvider} from "../../context/CartContext/CartProvider";

export const Main = (): React.JSX.Element => {
    return (
        <CartProvider>
            <Container fluid={true} className={'site'}>
                <Navbar/>
                <Container className={'main-container'}>
                    <Outlet/>
                </Container>
            </Container>
        </CartProvider>
    )
}