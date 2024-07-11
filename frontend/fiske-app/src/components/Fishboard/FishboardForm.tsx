
import React from "react";
import { ReactNode, useState } from "react";

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
        createFish(formData)
        setFormData(initialState);

    }

    const handleAddImage = () => {
        if (images.length < 5) {
          setImages([...images, null]);
        }
      };

    return (
        <div>
        <Form onSubmit={handleSave} className={`${styles.form} border border-primary rounded`} >
          <CloseButton onClick={toggleCreateFish}/>
          <h1>Edit Group</h1>
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
              name="name"
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
              type="text"
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
      <Button onClick={handleAddImage}>+</Button>
      </div>

    );
}

export default FishboardForm