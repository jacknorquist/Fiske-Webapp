import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import CreatePostForm from "./CreatePostForm.tsx";
import { Button } from "reactstrap";
import styles from './css/CreatePostContainer.module.css'

//posts = posts used to have useEffect from GroupContainer reload posts after one is made
function CreatePostContainer({group, toggleCreatePost, updatePosts}): ReactNode {


    const { setMessage } = useMessage();

  async function createPost(formData){
      try{
       await FiskeAPI.createPost( localStorage['fiske-token'], group, formData);
        updatePosts();
        toggleCreatePost();
      }catch (err){
        setMessage(err.message, 'error')
      }

  }
    return (
        <div className={styles.createpostcontainer}>
        <CreatePostForm  createPost={createPost}  toggleCreatePost={toggleCreatePost}/>
        </div>
    );
}

export default CreatePostContainer;