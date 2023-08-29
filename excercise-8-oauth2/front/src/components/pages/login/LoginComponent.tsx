import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import {doLogin} from "../../../services/apiCalls";
import useAuth from "../../../context/hooks/useAuth";

export const LoginComponent = (): React.JSX.Element => {
    const {onLogin} = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const user = await doLogin(email, password);
            onLogin(user);
        } catch (e) {
            setIsValid(false);
        }
    }

    return (
        <React.Fragment>
            <p className={'display-6 mb-6'}>Zaloguj sie</p>
            <Form onSubmit={handleLogin} className={`mb-3 ${!isValid && 'invalid-form'}`}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="emailInput"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        required={true}
                        onChange={(event) => {
                            const value = (event.target as HTMLInputElement).value;
                            setEmail(value);
                            !isValid && setIsValid(true);
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
                        required={true}
                        onChange={(event) => {
                            const value = (event.target as HTMLInputElement).value;
                            setPassword(value);
                            !isValid && setIsValid(true);
                        }}
                    />
                    <label htmlFor="passwordInput">Hasło</label>
                </Form.Floating>
                {!isValid && <Alert variant={'danger'}>
                    Wprowadziles nieprawidlowe dane.
                </Alert> }
                <div className="d-grid gap-2">
                    <Button type={'submit'}>Zaloguj</Button>
                </div>
            </Form>
        </React.Fragment>

    )
}