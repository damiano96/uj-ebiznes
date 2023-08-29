import React, {useState} from "react";
import {Alert, Card, Container, Row, Tab, Tabs} from "react-bootstrap";
import './style.css'
import {GoogleLogin} from "./oauth/GoogleLogin";
import {LoginComponent} from "./LoginComponent";
import {RegisterComponent} from "./RegisterComponent";

export const LoginPage = (): React.JSX.Element => {
    return (
        <div className={'login-page'}>
            <Container className={'login-container'}>
                <Card className={'login-content'}>
                    <Card.Body className={'login-content-body'}>
                        <Tabs
                            defaultActiveKey="login"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="login" title="Logowanie">
                                <LoginComponent/>
                            </Tab>
                            <Tab eventKey="register" title="Rejestracja">
                                <RegisterComponent/>
                            </Tab>
                        </Tabs>

                        <Row className="mt-5 oauth-panel">
                            <p className={'text-center'}>możesz skorzystać równiez z</p>
                            <GoogleLogin/>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}