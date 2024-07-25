import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreateCommentForm.module.css'


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

/**CreateCommentForm: Renders form to create a comment.
 *
 *Props:
 * - updatePost (function): function to update the PostListItem state
 * - createComment (function): function to create a comment
 *State:
 * -formData: data for the form
 *
 * PostListItem -> CommentsContainer -> Comment
 */
function CreateCommentForm({updatePost, createComment}): ReactNode {


    const initialState = {
        content: ""
    };
    const [formData, setFormData] = useState(initialState);

    //handle form change
    function handleChange(evt) {
      const { name, value, type, files } = evt.target;
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
  }

    //handle form submit
    function handleSave(evt) {
        evt.preventDefault();
        createComment(formData);
        setFormData(initialState);
        updatePost()
    }


    return (
        <div className={styles.container}>
        <Form onSubmit={handleSave} className={styles.form} >
        <FormGroup row style={{width:'100%'}}>
          <Col sm={10} style={{width:'100%'}}>
            <Input
              id="content"
              name="content"
              value={formData.content}
              type="text"
              placeholder="add a comment"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <Button>
        Post
      </Button>


      </Form>
      </div>

    );
}

export default CreateCommentForm