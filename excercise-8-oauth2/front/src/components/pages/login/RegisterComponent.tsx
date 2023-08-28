import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import React, {useState} from "react";

export const RegisterComponent = () => {
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState<string | undefined>('');

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <p className={'display-6 mb-6'}>Utwórz konto</p>
            <Form onSubmit={handleRegister} className="mb-3">
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="emailInput"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(event) => {
                            const value = (event.target as HTMLInputElement).value;
                            setEmail(value);
                        }}
                    />
                    <label htmlFor="emailInput">Adres email</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="passwordInput"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                            const value = (event.target as HTMLInputElement).value;
                            setPassword(value);
                        }}
                    />
                    <label htmlFor="passwordInput">Hasło</label>
                </Form.Floating>
                <div className="d-grid gap-2">
                    <Button type={'submit'}>Zarejestruj</Button>
                </div>
            </Form>
        </React.Fragment>
    )
}