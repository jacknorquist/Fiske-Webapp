import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreatePostForm.module.css'
import { useUser } from "../../context/UserContext.tsx";
import { UserType } from "../../types.ts";

import {
    Form,
    FormGroup,
    Col,
    Input,
    Button,
    CloseButton
  } from 'reactstrap';

  type FormData = {
    content: string;
  };
  type CreatePostFormProps = {
    createPost: (formData:FormData)=> void;
    toggleCreatePost:()=> void;
  }

//TODO: Adding Images visuals

/**CreatePostForm: renders form to create a post
 *
 *Props:
 * - createPost (function): creates post
 * - toggleCreatePost (function): toogles visibility of CreatePostContainer
 *
 *State:
 * - formData (obj): data for the form
 * - images (array): handles the amount of images available to add to a post
 * ProfileContainer -> CreateGroupContainer -> CreateGroupForm
 */
function CreatePostForm({createPost, toggleCreatePost}: CreatePostFormProps): ReactNode {
   const {user}:{user:UserType} = useUser()
    const [images, setImages] = useState<(string| null)[]>([])


    const initialState:FormData = {
        content: ""
    };
    const [formData, setFormData] = useState<FormData>(initialState);

    //handle form change
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const { name, value, type, files } = evt.target;
      if (type === "file") {
        if(files && files.length>0){
          setFormData(fData => ({
              ...fData,
              [name]: files[0]
          }));
        }
      } else {
          setFormData(fData => ({
              ...fData,
              [name]: value
          }));
      }
  }

    //handle form submit
    function handleSave(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        createPost(formData);
        setFormData(initialState);

    }
    //handle adding image to post
    const handleAddImage = () => {
        if (images.length < 5) {
          setImages([...images, null]);
        }
      };

    return (
        <div>
        <Form onSubmit={handleSave} className={styles.form} >
          <div className={styles.topRow}>
            <div className={styles.user}>
          <img className={styles.profileImage} src={user?.profile_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`}/>
          <p className={styles.userName}>{user?.first_name} {user?.last_name}</p>
          </div>
          <CloseButton className={styles.closeButton} onClick={toggleCreatePost}/>
          </div>
        <FormGroup row className={styles.contentInput}>
            <Input
            style={{width:'100%', height:'100%', border:'0px'}}
              id="content"
              name="content"
              placeholder="Craft your post..."
              value={formData.content}
              type="textarea"
              onChange={handleChange}
            />
        </FormGroup>
        <div className={styles.iconContainer}>
        <i className={`${styles.icon} bi bi-images`} onClick={handleAddImage}></i>
        </div>
        {images.map((image, index:number) => (
          <div key={index} className={styles.imageInput}>
          <FormGroup row>
          <Col sm={10}>
            <Input
              id={`post_image_${index+1}`}
              name={`post_image_${index+1}`}
              type="file"
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        </div>
      ))}
      <div className={styles.bottomRow}>
      <Button className={styles.submitButton}>
        Post
      </Button>
      </div>


      </Form>
      </div>

    );
}

export default CreatePostForm