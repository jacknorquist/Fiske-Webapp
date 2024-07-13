
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
        <Form onSubmit={handleSave} className={styles.form} >
          <CloseButton onClick={toggleCreateFish}/>
        <FormGroup row >
          <Label
            for="species"
            sm={2}
          >
          </Label>
          <Col sm={10} className={styles.input}>
            <Input
              id="species"
              name="species"
              placeholder='Species (Walleye, Perch, Black Crappie, etc..) '
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
          </Label>
          <Col sm={10} className={styles.input}>
            <Input
              id="length"
              name="length"
              placeholder='Length (in inches)'
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
        <div className={styles.bottomRow}>
        <Button className={styles.submitButton}>
        Add Fish
      </Button>
      </div>

      </Form>
      </div>

    );
}

export default FishboardForm