import React from "react";
import { ReactNode, useState } from "react";
import { useError } from "../../context/ErrorContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import CreatePostForm from "./CreatePostForm.tsx";
import { Button } from "reactstrap";
import styles from './css/CreatePostContainer.module.css'


function CreatePostContainer({group, toggleCreatePost}): ReactNode {


    const { setError } = useError();
    const {user, setUser} = useUser()
    const currentUserId = user!.id;

  async function createPost(formData){

      try{
        const {user} = await FiskeAPI.editUser(formData, currentUserId , localStorage['fiske-token'])
        setUser(user)
        toggleCreatePost()
      }catch (err){
        setError(err.message)
      }

  }


    return (
        <div className={styles.createpostcontainer}>
        <CreatePostForm  createPost={createPost} group= {group} toggleCreatePost={toggleCreatePost}user={user}/>
        </div>
    );
}

export default CreatePostContainer;