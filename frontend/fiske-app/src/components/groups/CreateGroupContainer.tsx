import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import CreatePostForm from "./CreateGroupForm.tsx";
import { Button } from "reactstrap";
import styles from './css/CreateGroupContainer.module.css';

//posts = posts used to have useEffect from GroupContainer reload posts after one is made
function CreateGroupContainer({toggleCreateGroup, updateUserAdminGroups}): ReactNode {

  const {user} = useUser()


    const { setMessage } = useMessage();

  async function createGroup(formData){
      try{
       await FiskeAPI.createGroup( localStorage['fiske-token'], formData);
       updateUserAdminGroups()
        toggleCreateGroup();
        setMessage('Group Created Successfully', 'success')
      }catch (err){
        setMessage(err.message, 'error')
      }

  }
    return (
        <div className={styles.creategroupcontainer}>
        <CreatePostForm  createGroup={createGroup}  toggleCreateGroup={toggleCreateGroup}/>
        </div>
    );
}

export default CreateGroupContainer;