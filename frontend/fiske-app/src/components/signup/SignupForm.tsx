
import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/SignupForm.module.css';
import { SignupFormDataType, SignupFormPropsType } from "../../types";
import {
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    Button
  } from 'reactstrap';

/**Signupform: renders form to signup
 *
 *Props:
 * - handleSignup (function): handles signing up user
 *
 *State:
 * - formData (obj): data for the form
 *
 * App -> RoutesList -> SignupContainer -> SignupForm
 */

function SignupForm({handleSignup}:SignupFormPropsType): ReactNode {

    const initialState: SignupFormDataType = {
        username: "",
        email: "",
        password:"",
        first_name: "",
        last_name: "",
        bio:"",
        profile_image: undefined,
        header_image:undefined
    };
    const [formData, setFormData] = useState<SignupFormDataType>(initialState);

    //handle form change
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value, type, files } = evt.target;
      if (type === "file") {
        if(files && files.length>0){
          setFormData(fData => ({
              ...fData,
              [name]: files[0]
          }));
        }
      } else {
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
      }
  }

    //handle form submit
    function handleSave(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        handleSignup(formData);
        setFormData(initialState);

    }
    return (
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`}>
          <h1 style={{textAlign:'center'}}>Signup</h1>
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
        <FormGroup row>
          <Label
            for="bio"
            sm={2}
          >
            Bio
          </Label>
          <Col sm={10}>
            <Input
              id="bio"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="profile_image"
            sm={2}
          >
            Profile Image
          </Label>
          <Col sm={10}>
            <Input
              id="profile_image"
              name="profile_image"
              placeholder="Last Name"
              type="file"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="header_image"
            sm={2}
          >
            Header Image
          </Label>
          <Col sm={10}>
            <Input
              id="header_image"
              name="header_image"
              placeholder="Last Name"
              type="file"
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