import React, { useState } from 'react';
import './Login.css';
import { useHistory } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';

import LoaderButton from "./../../components/LoaderButton/LoaderButton";
import Form from "react-bootstrap/Form";
import { useFormFields } from "./../../libs/hooksLib";

import { onError } from "./../../libs/errorLibs";
import { Auth } from "aws-amplify";
import { useAppContext } from "./../../libs/contextLibs";


export default function Login() {

    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <>

            <div className="split left">
                <a href="/" className="back">
                    Volta para loja
                </a>
                <div className="centered">
                    <div className="box">
                        <ScrollAnimation animateIn='zoomIn'>
                            <h2 className="tilteForm">
                                Login
                                </h2>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group size="lg" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        value={fields.email}
                                        onChange={handleFieldChange}
                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={fields.password}
                                        onChange={handleFieldChange}
                                    />
                                </Form.Group>
                                <LoaderButton className="btn" type="submit" disabled={!validateForm()}>
                                    Entrar
                                </LoaderButton>
                                <a className="linkBack" href="/registro"><p>Não tem conta?</p></a>
                            </Form>
                        </ScrollAnimation>
                    </div>

                </div>
            </div>
            <div className="split right"></div>

        </>

    )

}