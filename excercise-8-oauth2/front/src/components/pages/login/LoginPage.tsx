import React, { useEffect, useState } from "react";
import {Alert, Button, Card, Col, Container, Form, Row, Spinner, Tab, Tabs} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './style.css'
import { FcGoogle } from "react-icons/fc";
import {GoogleLogin} from "./oauth/GoogleLogin";
import {LoginComponent} from "./LoginComponent";
import {RegisterComponent} from "./RegisterComponent";

export const LoginPage = (): React.JSX.Element => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const navigate = useNavigate()



    const AlertMessage = (): React.JSX.Element => {
        return (
            <Alert variant={'danger'}>
                Coś poszło nie tak. Możliwe, że nieprawidłowe dane.
            </Alert>
        )
    }

    return (
        <div className={'login-page'}>
            <Container className={'login-container'}>
                <Card className={'login-content'}>
                    <Card.Body className={'login-content-body'}>
                        {isError && <AlertMessage/>}

                        <Tabs
                            defaultActiveKey="login"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="login" title="Logowanie">
                                <LoginComponent />
                            </Tab>
                            <Tab eventKey="register" title="Rejestracja">
                                <RegisterComponent />
                            </Tab>
                        </Tabs>

                        <Row className="mt-5 oauth-panel">
                            <p className={'text-center'}>możesz skorzystać równiez z</p>
                            {/*<Button variant="primary" size="lg" className={'login-button'}*/}
                            {/*        disabled={isLoading} type={"submit"}>*/}
                            {/*    {!isLoading*/}
                            {/*        ? <span><FcGoogle /> 'Zaloguj'</span>*/}
                            {/*        : <><Spinner animation="border" size="sm"/> Zaloguj</>*/}
                            {/*    }*/}
                            {/*</Button>*/}
                            <GoogleLogin />
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}