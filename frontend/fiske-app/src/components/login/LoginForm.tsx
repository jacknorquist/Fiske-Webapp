

import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/LoginForm.module.css'
import {
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    FormText,
    Button
  } from 'reactstrap';

function LoginForm({handleLogin}): ReactNode {

    const initialState = {
      username: "",
      password:"",
    };

    const [formData, setFormData] = useState(initialState);


    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(fData => ({
          ...fData,
          [name]: value,
      }));
  }


    async function handleSave(evt) {
      evt.preventDefault();
      await handleLogin(formData)
      setFormData(initialState);
  }



    return (
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`}>
          <h1>Login</h1>
        <FormGroup row>
          <Label
            for="username"
            sm={2}
          >
            Username
          </Label>
          <Col sm={10}>
            <Input
              id="username"
              name="username"
              placeholder="username"
              value={formData.username}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="password"
            sm={2}
          >
            Password
          </Label>
          <Col sm={10}>
            <Input
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              type="password"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <Button>
          Submit
        </Button>
      </Form>
    );
}

export default LoginForm