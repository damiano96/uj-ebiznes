import { Row, Spinner } from "react-bootstrap";

export const Loader = () => {
    return (
         <Row className={'loader'}>
             <Spinner animation="border" role="status"/>
         </Row>
    )
}