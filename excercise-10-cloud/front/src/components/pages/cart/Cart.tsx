import { Container, Row, Table } from "react-bootstrap";
import { CartProduct } from "./CartProduct";
import { CartSummary } from "./CartSummary";
import {useCart} from "../../../context/hooks/useCart";
import React from "react";

export const Cart = (): React.JSX.Element => {
    const {shopCart} = useCart();

    return (
         <Container>
             <Row style={{marginBottom: '40px'}}>
                 <span className={'display-6'}>Koszyk</span>
             </Row>
             {shopCart?.length ?
                  <>
                      <Row>
                          <Table className={'cart-table'} size={'sm'}>
                              <thead>
                              <tr>
                                  <th>Produkt</th>
                                  <th>Liczba</th>
                                  <th>Cena sztuka</th>
                                  <th>Cena</th>
                                  <th>Akcja</th>
                              </tr>
                              </thead>
                              <tbody>
                              {shopCart.map(product => (
                                   <CartProduct {...product} />
                              ))}
                              </tbody>
                          </Table>
                      </Row>
                      <CartSummary />
                  </>
                  : <h5 className={'text-center'}>Brak produków w koszyku</h5>}
         </Container>
    );

}