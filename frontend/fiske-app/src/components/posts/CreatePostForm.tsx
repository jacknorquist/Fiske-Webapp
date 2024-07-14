import React from "react";
import { ReactNode, useState } from "react";
import styles from './css/CreatePostForm.module.css'
import { useUser } from "../../context/UserContext.tsx";

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

function CreatePostForm({createPost, toggleCreatePost}): ReactNode {
   const {user} = useUser()
    const [images, setImages] = useState([])


    const initialState = {
        content: ""
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
        {images.map((image, index) => (
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