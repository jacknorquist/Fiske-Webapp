import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import styles from './css/EditGroupContainer.module.css'
import EditGroupForm from "./EditGroupForm.tsx";
import { useParams } from "react-router-dom";
import { GroupType, GroupTypeWithFishboard } from "../../types.ts";

type FormData = {
  name: string;
  fish_species: string;
  area: string;
  description:string;
  header_image?: File;
};


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
function EditGroupContainer({toggleEditGroup,updateGroup, group}:{toggleEditGroup: ()=> void, updateGroup:()=>void, group:GroupTypeWithFishboard }): ReactNode {

  const { setMessage } = useMessage();
  const groupId:String | undefined = useParams().id

  //edit group
  async function editGroup(formData:FormData){
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