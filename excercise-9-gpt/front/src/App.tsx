import React from 'react';
import './App.css';
import axios from "axios";
import {Button, Card, Col, Container, FloatingLabel, Form, Row} from 'react-bootstrap';

const CHAT_API_URL = 'http://127.0.0.1:5000/api/chat';

interface MessageRq {
    content: string;
    role: string;
}

interface MessageRs {
    response: string;
}

interface Conversation {
    request: string,
    response: string
}

export const App = (): React.JSX.Element => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [conversation, setConversation] = React.useState<Conversation[]>([]);

    const [actualRequestMessage, setActualRequestMessage] = React.useState<string>('');
    const sendMessage = async (messages: MessageRq[], newConversation: Conversation): Promise<void> => {
        try {
            const response = await axios.post<MessageRs>(CHAT_API_URL, {messages: messages});
            newConversation.response = response.data.response;
            setConversation([...conversation, newConversation]);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSendMessage = (): void => {
        if (actualRequestMessage !== '') {
            setIsLoading(true);
            const newMessage: MessageRq[] = [{content: actualRequestMessage, role: 'user'}];
            const newConversation: Conversation = {request: actualRequestMessage, response: '...'};

            setConversation([...conversation, newConversation]);

            sendMessage(newMessage, newConversation);
        }

        setActualRequestMessage('');
    }

    return (
        <Container>
            <h1>Chat</h1>
            <Row>
                {conversation.map((item, index) => {
                    return (
                        <Card className={'mb-4'}>
                            <Card.Header><b>{item.request}</b></Card.Header>
                            <Card.Body>{item.response}</Card.Body>
                        </Card>
                    )
                })}
            </Row>
            <Row>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Twoja wiadomość"
                        className="mb-3"
                    >
                        <Form.Control type="text" value={actualRequestMessage} placeholder="Twoje pytanie"
                                      onChange={(event) => setActualRequestMessage(event.target.value)}/>
                    </FloatingLabel>
                </Col>
                <Col>
                    <Button variant="primary" size="lg" disabled={isLoading} onClick={() => handleSendMessage()}>Send</Button>
                </Col>
            </Row>
        </Container>
    )
}