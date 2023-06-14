import { Button, Col, Container, Row } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import {useCart} from "../../../context/hooks/useCart";
import {ICart} from "../../../interfaces/ICart";
export const CartProduct = (props: ICart) => {
    const {increaseCountOfItem, reduceCountOfItem, removeItemFromCart} = useCart();

    const getCurrentProductPrice = (): number => {
        return props.Product.Price * props.Quantity;
    }

    return (
         <tr>
             <td>
                 {props.Product.Name}
             </td>
             <td>
                 <Container style={{display: "flex"}}>
                     <Row>
                         <Col>
                             <Button size={'sm'} onClick={() => reduceCountOfItem(props.ID)}>
                                 -
                             </Button>
                         </Col>
                         <Col style={{
                             display: "flex",
                             alignItems: "center"
                         }}>
                             {props.Quantity}
                         </Col>
                         <Col>
                             <Button size={'sm'} onClick={() => increaseCountOfItem(props.ID)}>
                                 +
                             </Button>
                         </Col>
                     </Row>
                 </Container>
             </td>
             <td>
                 {props.Product.Price}
             </td>
             <td>
                 {getCurrentProductPrice()}
             </td>
             <td>
                 <Button
                      variant={'danger'}
                      onClick={() => {
                          removeItemFromCart(props.ID)
                      }}>
                     <BsTrashFill/>
                 </Button>
             </td>
         </tr>
    )
}