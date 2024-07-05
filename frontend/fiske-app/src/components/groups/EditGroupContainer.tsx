import React from "react";
import { ReactNode, useState } from "react";
import { useError } from "../../context/ErrorContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import CreatePostForm from "./CreateGroupForm.tsx";
import { Button } from "reactstrap";
import styles from './css/EditGroupContainer.module.css'
import EditGroupForm from "./EditGroupForm.tsx";

//posts = posts used to have useEffect from GroupContainer reload posts after one is made
function EditGroupContainer({toggleEditGroup, groupId, updateGroup}): ReactNode {


    const { setError } = useError();

  async function editGroup(formData){
      try{
       await FiskeAPI.editGroup( localStorage['fiske-token'], formData, groupId);
       updateGroup();
        toggleEditGroup();
      }catch (err){
        setError(err.message)
      }

  }
    return (
        <div className={styles.editgroupcontainer}>
        <EditGroupForm editGroup={editGroup}  toggleEditGroup={toggleEditGroup}/>
        </div>
    );
}

export default EditGroupContainer;