import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreateGroupForm.module.css'

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

function CreateGroupForm({createGroup, toggleCreateGroup}): ReactNode {


    const initialState = {
        name:"",
        fish_species: "",
        area:"",
        description:"",
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
        createGroup(formData);
        setFormData(initialState);

    }

    return (
        <div>
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`} >
          <CloseButton onClick={toggleCreateGroup}/>
          <h1>Create Group</h1>
        <FormGroup row>
          <Label
            for="name"
            sm={2}
          >
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="name"
              name="name"
              value={formData.name}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="description"
            sm={2}
          >
            Description
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              value={formData.description}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="fish_species"
            sm={2}
          >
            Fish Species
          </Label>
          <Col sm={10}>
            <Input
              id="fish_species"
              name="fish_species"
              value={formData.fish_species}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="area"
            sm={2}
          >
            Area
          </Label>
          <Col sm={10}>
            <Input
              id="area"
              name="area"
              value={formData.area}
              type="text"
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
              type="file"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>

        <Button>
        Submit
      </Button>

      </Form>
      </div>

    );
}

export default CreateGroupForm