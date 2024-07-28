import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import CreatePostForm from "./CreatePostForm.tsx";
import styles from './css/CreatePostContainer.module.css';
import { PostFormDataType, CreatePostContainerPropsType } from "../../types.ts";


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
function CreatePostContainer({
                              groupId,
                              toggleCreatePost,
                              updatePosts
                            }: CreatePostContainerPropsType): ReactNode {

  const { setMessage } = useMessage();

  //create post
  async function createPost(formData:PostFormDataType){
      try{
       await FiskeAPI.createPost(
                                 localStorage['fiske-token'],
                                 Number(groupId),
                                 formData);
        updatePosts();
        toggleCreatePost();
      }catch(err:unknown){
        if (err instanceof Error) {
            setMessage(err.message, 'error');
          }else{
            setMessage('An Unknown Error Occurred', 'error')
          }
        }

  }
    return (
        <div className={styles.createpostcontainer}>
          <CreatePostForm
          createPost={createPost}
          toggleCreatePost={toggleCreatePost}/>
        </div>
    );
}

export default CreatePostContainer;