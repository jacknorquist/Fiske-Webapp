import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreateCommentForm.module.css';
import { CommentFormDataType, CreateCommentFormPropsType} from "../../types";


import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
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
function CreateCommentForm({updatePost, createComment}: CreateCommentFormPropsType): ReactNode {


    const initialState:CommentFormDataType = {
        content: ""
    };
    const [formData, setFormData] = useState<CommentFormDataType>(initialState);

    //handle form change
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = evt.target;
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
  }

    //handle form submit
    function handleSave(evt: React.FormEvent<HTMLFormElement>) {
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