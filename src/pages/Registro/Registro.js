import React, { useState } from 'react';
import './Registro.css';
import { useHistory } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';

import LoaderButton from "./../../components/LoaderButton/LoaderButton";
import Form from "react-bootstrap/Form";
import { useFormFields } from "./../../libs/hooksLib";

import { onError } from "./../../libs/errorLibs";
import { Auth } from "aws-amplify";
import { useAppContext } from "./../../libs/contextLibs";


export default function Registro() {

    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }
    async function handleSubmit(event) {
        event.preventDefault();
      
        setIsLoading(true);
      
        try {
          const newUser = await Auth.signUp({
            username: fields.email,
            password: fields.password,
          });
          setIsLoading(false);
          setNewUser(newUser);
        } catch (e) {
          onError(e);
          setIsLoading(false);
        }
      }
      
      async function handleConfirmationSubmit(event) {
        event.preventDefault();
      
        setIsLoading(true);
      
        try {
          await Auth.confirmSignUp(fields.email, fields.confirmationCode);
          await Auth.signIn(fields.email, fields.password);
      
          userHasAuthenticated(true);
          history.push("/");
        } catch (e) {
          onError(e);
          setIsLoading(false);
        }
      }

    function renderConfirmationForm() {
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
                                    Registro
                                </h2>
                                <Form onSubmit={handleConfirmationSubmit}>
                                    <Form.Group controlId="confirmationCode" size="lg">

                                        <Form.Label>Coloque o codigo mandado para o seu email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="tel"
                                            onChange={handleFieldChange}
                                            value={fields.confirmationCode}
                                        />

                                    </Form.Group>
                                    <LoaderButton
                                        block
                                        size="lg"
                                        type="submit"
                                        variant="success"
                                        isLoading={isLoading}
                                        disabled={!validateConfirmationForm()}
                                    >
                                        Verificar
                                    </LoaderButton>
                                </Form>
                            </ScrollAnimation>
                        </div>

                    </div>
                </div>
                <div className="split right"></div>






            </>
        );
    }

    function renderForm() {
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
                                    Registro
                                </h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="email" size="lg">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            value={fields.email}
                                            onChange={handleFieldChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password" size="lg">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={fields.password}
                                            onChange={handleFieldChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword" size="lg">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            onChange={handleFieldChange}
                                            value={fields.confirmPassword}
                                        />
                                    </Form.Group>
                                    <LoaderButton className="btn" type="submit" disabled={!validateForm()}>
                                        Registrar
                                </LoaderButton>
                                    <a className="linkBack" href="/login"><p>Já tem conta?</p></a>
                                </Form>
                            </ScrollAnimation>
                        </div>

                    </div>
                </div>
                <div className="split right"></div>

            </>
        );
    }

    return (
        <>

            {newUser === null ? renderForm() : renderConfirmationForm()}
        </>

    );

}