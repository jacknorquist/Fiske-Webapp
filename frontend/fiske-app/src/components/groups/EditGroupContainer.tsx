import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import styles from './css/EditGroupContainer.module.css'
import EditGroupForm from "./EditGroupForm.tsx";
import { useParams } from "react-router-dom";

/**EditGroupContainer: handles editGroup functionality and renders EditGroupForm
 *
 *Props:
 * - toggleEditGroup (function): toogles visibility of EditGroupContainer
 * - editGroup (function): edits group
 *
 *State:
 * -formData: data form the form
 *
 * ProfileContainer -> EditeGroupContainer -> GroupForm
 */
function EditGroupContainer({toggleEditGroup,updateGroup, group}): ReactNode {

  const { setMessage } = useMessage();
  const groupId = useParams().id

  //edit group
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