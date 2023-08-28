import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import axios from "axios";

export const GoogleLogin = (): React.JSX.Element => {
    const handleOnClick = () => {
        const oauthUrl = 'http://localhost:1323/oauth/login'

        axios.get(oauthUrl).then((response) => { console.log(response)  })

        // window.location.href = oauthUrl;
    }

    return (
        <Button variant="outline-primary oauth-button" onClick={handleOnClick}>
        <Row className={''}>
            <Col>
                <i className="bi bi-google"></i>
                <span className={'service-name'}>Google</span>
            </Col>
        </Row>
        </Button>
    )
}