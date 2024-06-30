import React from "react";
import { ReactNode, useState } from "react";
import { useError } from "../../context/ErrorContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import CreatePostForm from "./CreatePostForm.tsx";
import { Button } from "reactstrap";
import styles from './css/CreatePostContainer.module.css'

//posts = posts used to have useEffect from GroupContainer reload posts after one is made
function CreatePostContainer({group, toggleCreatePost, posts}): ReactNode {


    const { setError } = useError();

  async function createPost(formData){
      try{
       await FiskeAPI.createPost( localStorage['fiske-token'], group, formData);
        posts=posts;
        toggleCreatePost();
      }catch (err){
        setError(err.message)
      }

  }
    return (
        <div className={styles.createpostcontainer}>
        <CreatePostForm  createPost={createPost}  toggleCreatePost={toggleCreatePost}/>
        </div>
    );
}

export default CreatePostContainer;