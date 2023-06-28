import { Button, Col, Row } from "react-bootstrap";
import React from "react";
import {useCart} from "../../../context/hooks/useCart";
import {Link} from "react-router-dom";

export const CartSummary = (): React.JSX.Element => {
    const {getShopCartPrice} = useCart();

    return (
         <Row style={{marginTop: '30px'}}>
             <Col style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                 <h4> Podsumowanie</h4>
                 <h6>Cena końcowa: {getShopCartPrice()}zł</h6>
                 <Link to={'/payments'}>
                     <Button role={'button'}>Zamów</Button>
                 </Link>
             </Col>
         </Row>
    )
}