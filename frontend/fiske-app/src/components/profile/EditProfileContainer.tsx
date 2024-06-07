import React from "react";
import { ReactNode, useState } from "react";
import { useError } from "../../context/ErrorContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import styles from '../../css//profile/EditProfileContainer.module.css'
import EditProfileForm from "./EditProfileForm.tsx";
import { Button } from "reactstrap";



function EditProfileContainer({toggleEditProfileForm}): ReactNode {

    const { setError } = useError();
    const {user, setUser} = useUser()



  async function handleEdit(formData){

      try{
        const {user} = await FiskeAPI.editUser(formData, localStorage['fiske-token'])
        setUser(user)
      }catch (err){
        setError(err.message)
      }

  }



    return (
        <div className={styles.editprofilecontainer}>
        <EditProfileForm  handleEdit={handleEdit} toggleEditProfileForm={toggleEditProfileForm}user={user}/>
        </div>
    );
}

export default EditProfileContainer;