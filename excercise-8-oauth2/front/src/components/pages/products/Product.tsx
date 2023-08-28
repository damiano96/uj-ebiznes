import React from "react";
import { Button, Card } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import {useCart} from "../../../context/hooks/useCart";
import {IProduct} from "../../../interfaces/IProduct";

export const Product = (props: IProduct): React.JSX.Element => {
    const {addProductToCart} = useCart();
    const {Name, Price, Category} = props;

    const addProduct = (): void => {
        addProductToCart({...props});
    }

    return (
         <>
             <Card>
                 <Card.Body>
                     <Card.Title>{Name}</Card.Title>
                     <Card.Body>
                         <p>Kategoria: {Category.Name}</p>
                         <p>Cena: {Price}</p>
                     </Card.Body>
                     <Card.Footer>
                         <Button size={'sm'} onClick={addProduct}>
                             <span>Dodaj <BsCartPlus/></span>
                         </Button>
                     </Card.Footer>
                 </Card.Body>
             </Card>
         </>
    )
}