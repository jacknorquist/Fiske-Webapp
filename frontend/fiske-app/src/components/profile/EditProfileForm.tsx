
import React from "react";
import { ReactNode, useState } from "react";
import styles from '../../css/form.module.css'

import {
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    FormText,
    Button,
    CloseButton
  } from 'reactstrap';

function EditProfileForm({handleEdit, toggleEditProfileForm}): ReactNode {

    const initialState = {
        username: "",
        first_name: "",
        last_name: "",
        profile_image: null,
        header_image:null
    };
    const [formData, setFormData] = useState(initialState);


    function handleChange(evt) {
      const { name, value, type, files } = evt.target;
      if (type === "file") {
          setFormData(fData => ({
              ...fData,
              [name]: files[0]
          }));
      } else {
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
      }
  }


    function handleSave(evt) {
        evt.preventDefault();
        handleEdit(formData);
        setFormData(initialState);

    }
    return (
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`}>
          <CloseButton onClick={toggleEditProfileForm}/>
          <h1>Signup</h1>
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
            Profile Image
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

export default EditProfileForm