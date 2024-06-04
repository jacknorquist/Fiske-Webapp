

import React from "react";
import { ReactNode, useState } from "react";
import {
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    FormText,
    Button
  } from 'reactstrap';

function LoginForm({login}): ReactNode {

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


    function handleSave(evt) {
      evt.preventDefault();
      login(formData);
      setFormData(initialState);

  }



    return (
        <Form onSubmit={handleSave}>
        <FormGroup row>
          <Label
            for="username"
            sm={2}
          >
            Email
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