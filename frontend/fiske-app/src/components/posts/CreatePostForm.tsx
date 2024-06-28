import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreatePostForm.module.css'

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

function CreatePostForm({createPost, toggleCreatePost, user, group}): ReactNode {
    const [images, setImages] = useState([])


    const initialState = {
        title:"",
        content: "",
        group: group,
        profile_image: null,
        header_image: null
    };
    const [formData, setFormData] = useState(initialState);
    console.log(formData)


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
        createPost(formData);
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
          <CloseButton onClick={toggleCreatePost}/>
          <h1>reate Post</h1>
        <FormGroup row>
          <Label
            for="title"
            sm={2}
          >
            Title
          </Label>
          <Col sm={10}>
            <Input
              id="title"
              name="title"
              value={formData.title}
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
            Content
          </Label>
          <Col sm={10}>
            <Input
              id="content"
              name="content"
              placeholder="content"
              value={formData.content}
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
              placeholder={user.last_name}
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
        {images.map((image, index) => (
        <div key={index}>
          <FormGroup row>
          <Label
            for={`post_image_${index}`}
            sm={2}
          >
            Image
          </Label>
          <Col sm={10}>
            <Input
              id={`post_image_${index}`}
              name={`post_image_${index}`}
              type="file"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        </div>
      ))}

        <Button>
        Submit
      </Button>

      </Form>
      <Button onClick={handleAddImage}>+</Button>
      </div>

    );
}

export default CreatePostForm