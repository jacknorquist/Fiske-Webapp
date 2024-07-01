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

function CreateCommentForm({createComment, updatePost}): ReactNode {


    const initialState = {
        content: ""
    };
    const [formData, setFormData] = useState(initialState);


    function handleChange(evt) {
      const { name, value, type, files } = evt.target;
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
  }


    function handleSave(evt) {
        evt.preventDefault();
        createComment(formData);
        setFormData(initialState);
        updatePost()

    }


    return (
        <div>
        <Form onSubmit={handleSave} className='border border-primary rounded' >
        <FormGroup row>
          <Label
            for="title"
            sm={2}
          >
            Content
          </Label>
          <Col sm={10}>
            <Input
              id="content"
              name="content"
              value={formData.content}
              type="text"
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

export default CreateCommentForm