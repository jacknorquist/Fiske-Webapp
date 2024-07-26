import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import styles from './css/EditGroupContainer.module.css'
import EditGroupForm from "./EditGroupForm.tsx";
import { useParams } from "react-router-dom";
import { EditGroupContainerPropsType, GroupFormDataType } from "../../types.ts";

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
function EditGroupContainer({toggleEditGroup,updateGroup, group}:EditGroupContainerPropsType): ReactNode {

  const { setMessage } = useMessage();
  const groupId:String | undefined = useParams().id

  //edit group
  async function editGroup(formData:GroupFormDataType){
      try{
       await FiskeAPI.editGroup( localStorage['fiske-token'], formData, groupId);
       updateGroup();
        toggleEditGroup();
        setMessage('Group Updated', 'success')
      }catch(err:unknown){
        if (err instanceof Error) {
            setMessage(err.message, 'error');
          }else{
            setMessage('An Unknown Error Occurred', 'error')
          }
    }

  }
    return (
        <div className={styles.editgroupcontainer}>
        <EditGroupForm group={group} editGroup={editGroup}  toggleEditGroup={toggleEditGroup}/>
        </div>
    );
}

export default EditGroupContainer;