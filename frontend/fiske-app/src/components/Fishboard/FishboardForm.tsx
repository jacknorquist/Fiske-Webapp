
import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/FishboardForm.module.css'

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

function FishboardForm({createFish, toggleCreateFish}): ReactNode {
    const [images, setImages] = useState([])


    const initialState = {
        species:"",
        length: "",
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
        createFish(formData);
        toggleCreateFish()
        setFormData(initialState);

    }


    return (
        <div>
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`} >
          <CloseButton onClick={toggleCreateFish}/>
          <h1>What'd you catch? Is it big enough to go on the fishboard?</h1>
        <FormGroup row>
          <Label
            for="species"
            sm={2}
          >
            Species
          </Label>
          <Col sm={10}>
            <Input
              id="species"
              name="species"
              placeholder={formData.species}
              value={formData.species}
              type="text"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="length"
            sm={2}
          >
            Length
          </Label>
          <Col sm={10}>
            <Input
              id="length"
              name="length"
              placeholder={formData.length}
              value={formData.length}
              type="number"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="image"
            sm={2}
          >
            Image
          </Label>
          <Col sm={10}>
            <Input
              id="image"
              name="image"
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

export default FishboardForm