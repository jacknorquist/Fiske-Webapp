import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import CreatePostForm from "./CreateGroupForm.tsx";
import { Button } from "reactstrap";
import styles from './css/EditGroupContainer.module.css'
import EditGroupForm from "./EditGroupForm.tsx";
import { useParams } from "react-router-dom";

//posts = posts used to have useEffect from GroupContainer reload posts after one is made
function EditGroupContainer({toggleEditGroup,updateGroup, group}): ReactNode {


    const { setMessage } = useMessage();
    const groupId = useParams().id

  async function editGroup(formData){
      try{
       await FiskeAPI.editGroup( localStorage['fiske-token'], formData, groupId);
       updateGroup();
        toggleEditGroup();
        setMessage('Group Updated', 'success')
      }catch (err){
        setMessage(err.message, 'error')
      }

  }
    return (
        <div className={styles.editgroupcontainer}>
        <EditGroupForm group={group} editGroup={editGroup}  toggleEditGroup={toggleEditGroup}/>
        </div>
    );
}

export default EditGroupContainer;