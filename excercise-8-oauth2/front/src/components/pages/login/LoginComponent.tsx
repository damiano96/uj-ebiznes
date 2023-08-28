import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {doLogin} from "../../../services/apiCalls";
import useAuth from "../../../context/hooks/useAuth";

export const LoginComponent = (): React.JSX.Element => {
    const {onLogin} = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const user = await doLogin(email, password);
            onLogin(user);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <React.Fragment>
            <p className={'display-6 mb-6'}>Zaloguj sie</p>
            <Form onSubmit={handleLogin} className="mb-3">
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
                    <Button type={'submit'}>Zaloguj</Button>
                </div>
            </Form>
        </React.Fragment>

    )
}