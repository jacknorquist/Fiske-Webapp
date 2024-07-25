
import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/EditProfileForm.module.css'

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

/**EditProfileForm: renders form to edit profile
 *
 *Props:
 * - handleEdit (function): handles editing profile
 * - toggleEditProfileForm (function): toogles visibility of EditProfileContainer
 *
 *State:
 * -formData: data for the form
 *
 * ProfileContainer -> EditProfileContainer-> EditProfileForm
 */
function EditProfileForm({handleEdit, toggleEditProfileForm, user}): ReactNode {

    const initialState = {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        bio: user.bio,
        profile_image: null,
        header_image: null
    };
    const [formData, setFormData] = useState(initialState);

    //hadle form change
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

    //jandle form submit
    function handleSave(evt) {
        evt.preventDefault();
        handleEdit(formData);
        setFormData(initialState);

    }
    return (
        <Form onSubmit={handleSave} className={styles.form}>
          <div className={styles.header}>
          <CloseButton onClick={toggleEditProfileForm}/>
          </div>
        <div className={styles.name}>
        <FormGroup row>
          <Label
            for="first_name"
            sm={2}
          >
            First Name
          </Label>
          <Col sm={10} className={styles.input}>
            <Input
              id="first_name"
              name="first_name"
              placeholder={user.first_name}
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
          <Col sm={10} className={styles.input}>
            <Input
              id="last_name"
              name="last_name"
              placeholder={user.last_name}
              value={formData.last_name}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        </div>
        <FormGroup row>
          <Label
            for="username"
            sm={2}
          >
            Username
          </Label>
          <Col sm={10} className={styles.input}>
            <Input
              id="username"
              name="username"
              placeholder={user.username}
              value={formData.username}
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
          <Col sm={10} className={styles.input}>
            <Input
              id="bio"
              name="bio"
              placeholder={user.bio}
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
          <Col sm={10} className={styles.input}>
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
          <Col sm={10} className={styles.input}>
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
        Update Profile
      </Button>

      </Form>
    );
}

export default EditProfileForm