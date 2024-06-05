
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

function SignupForm({handleSignup}): ReactNode {

    const initialState = {
        username: "",
        email: "",
        password:"",
        first_name: "",
        last_name: ""
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
        handleSignup(formData);
        setFormData(initialState);

    }
    return (
        <Form onSubmit={handleSave}>
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
              value={formData.email}
              type="email"
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
        <FormGroup row>
          <Label
            for="first_name"
            sm={2}
          >
            First Name
          </Label>
          <Col sm={10}>
            <Input
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="last_name"
            sm={2}
          >
            Last Name
          </Label>
          <Col sm={10}>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              type="text"
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

export default SignupForm