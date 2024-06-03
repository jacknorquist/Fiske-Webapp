

import React from "react";
import { ReactNode } from "react";
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
    return (
        <Form onSubmit={login}>
        <FormGroup row>
          <Label
            for="email"
            sm={2}
          >
            Email
          </Label>
          <Col sm={10}>
            <Input
              id="email"
              name="email"
              placeholder="example@email.com"
              type="email"
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
              type="password"
            />
          </Col>
        </FormGroup>
      </Form>
    );
}

export default LoginForm