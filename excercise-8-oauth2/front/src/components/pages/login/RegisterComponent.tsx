import {Alert, Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {doRegister} from "../../../services/apiCalls";
import {Variant} from "react-bootstrap/types";

interface IRegisterStatus {
    valid: boolean,
    status: string
}

export const RegisterComponent = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [registerStatus, setRegisterStatus] = useState<IRegisterStatus|null>(null);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await doRegister(email, password);
            setRegisterStatus({ valid: true, status: response['message'] });
            setEmail('');
            setPassword('');
        } catch (e: any) {
            setRegisterStatus({ valid: false, status: e['response']['data'] });
            console.log(e);
        }
    }

    const renderAlert = (type: Variant, text: string) => {
        return (
            <Alert variant={type}>
                {text}
            </Alert>
        )
    }

    return (
        <React.Fragment>
            <p className={'display-6 mb-6'}>Utwórz konto</p>
            <Form onSubmit={handleRegister} className={`mb-3 ${(registerStatus && !registerStatus?.valid) && 'invalid-form'}`}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="emailInput"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(event) => {
                            const value = (event.target as HTMLInputElement).value;
                            setEmail(value);
                            setRegisterStatus(null);
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
                            setRegisterStatus(null);
                        }}
                    />
                    <label htmlFor="passwordInput">Hasło</label>
                </Form.Floating>
                {registerStatus && renderAlert(registerStatus.valid ? 'success' : 'danger', registerStatus.status)}
                <div className="d-grid gap-2">
                    <Button type={'submit'}>Zarejestruj</Button>
                </div>
            </Form>
        </React.Fragment>
    )
}