import React from "react";
import { ReactNode, useState } from "react";
import { useMessage } from "../../context/MessageContext.tsx";
import FiskeAPI from "../../api.ts";
import styles from './css/CreateGroupContainer.module.css';
import CreateGroupForm from "./CreateGroupForm.tsx";
import { GroupFormDataType,
         CreateGroupContainerPropsType }
         from "../../types.ts";


/**CreateGroupContainer: Handles createGroup functionality and renders container that
 * holds CreateGroupForm.
 *
 *Props:
 * - toggleCreateGroup (function): toogles visibility of CreateGroupContainer
 * - updateUserAdminGroups (function): updates userAdminGroups
 *
 *State:
 * -none
 *
 * ProfileContainer -> CreateGroupContainer
 */
function CreateGroupContainer({
                               toggleCreateGroup,
                               updateUserAdminGroups
                              }:CreateGroupContainerPropsType): ReactNode {

  const { setMessage } = useMessage();

  //create group
  async function createGroup(formData:GroupFormDataType){
      try{
       await FiskeAPI.createGroup( localStorage['fiske-token'], formData);
       updateUserAdminGroups()
        toggleCreateGroup();
        setMessage('Group Created Successfully', 'success')
      }catch(err:unknown){
        if (err instanceof Error) {
            setMessage(err.message, 'error');
          }else{
            setMessage('An Unknown Error Occurred', 'error')
          }
    }

  }
    return (
        <div className={styles.creategroupcontainer}>
        <CreateGroupForm
        createGroup={createGroup}
        toggleCreateGroup={toggleCreateGroup}/>
        </div>
    );
}

export default CreateGroupContainer;