import * as React from "react";
import {Col, Row} from "react-bootstrap";
import {Product} from "./Product";
import './styles/style.css'
import {Loader} from "../../common/Loader";
import {useProducts} from "./hooks/useProducts";
import {IProduct} from "../../../interfaces/IProduct";

export const Products = (): React.JSX.Element => {
    const {products, isLoading, error} = useProducts();

    if (!error) {
        return (
            <>
                {!isLoading ?
                    <Row xs={1} md={3} className="g-4">
                        {products.map((product: IProduct) =>
                            <Col>
                                <Product {...product} />
                            </Col>
                        )}
                    </Row>
                    : <Loader/>}
            </>
        )
    } else {
        return <h1>Wsytapil pewien blad</h1>
    }
}