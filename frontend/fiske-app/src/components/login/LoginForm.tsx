

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

  type FormData = {
    username: string;
    password:string;
  };
  type LoginFormProps = {
    handleLogin: (formData: FormData)=> void;
  }


/**LoginForm: renders form to login
 *
 *Props:
 * - handleLogin (function): handles loging in user
 *
 *State:
 * - formData (obj): data for the form
 *
 * App -> RoutesList -> LoginContainer -> LoginForm
 */
function LoginForm({handleLogin}:LoginFormProps): ReactNode {

    const initialState:FormData = {
      username: "",
      password:"",
    };

    const [formData, setFormData] = useState<FormData>(initialState);

    //handle form change
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = evt.target;
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
  }


  //handle form submit
  async function handleSave(evt: React.FormEvent<HTMLFormElement>) {
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