import React from "react";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import './style.css'
import {Navbar} from "./navbar/Navbar";
import {CartProvider} from "../../context/CartContext/CartProvider";
import useAuth from "../../context/hooks/useAuth";

export const Main = (): React.JSX.Element => {
    const {user} = useAuth();

    return (
        <CartProvider>
            <Container fluid={true} className={'site'}>
                <Navbar/>
                <Container className={'main-container'}>
                    <p className={'display-6 mb-5'}>Witaj {user?.email}</p>
                    <Outlet/>
                </Container>
            </Container>
        </CartProvider>
    )
}