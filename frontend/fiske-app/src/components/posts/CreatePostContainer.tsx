import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import CreatePostForm from "./CreatePostForm.tsx";
import { Button } from "reactstrap";
import styles from './css/CreatePostContainer.module.css'

/**CreatePostContainer: renders CreatePostForm and handles create post functionality
 *
 *Props:
 * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 * - toggleCreatePost (function): toggles CreatePostContainer visibility
 * - updatePosts (function): updates posts
 *
 *State:
 * - none
 *
 *  RoutesList -> GroupContainer -> CreatePostContainer
 */
function CreatePostContainer({group, toggleCreatePost, updatePosts}): ReactNode {

  const { setMessage } = useMessage();

  //create post
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