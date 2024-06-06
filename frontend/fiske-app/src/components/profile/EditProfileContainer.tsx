import React from "react";
import { ReactNode, useState } from "react";
import { useError } from "../../context/ErrorContext.tsx";
import FiskeAPI from "../../api.ts";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import { useUser } from "../../context/UserContext.tsx";
import styles from 'src/css/fomContainer.module.css'
import EditProfileForm from "./EditProfileForm.tsx";
import { Button } from "reactstrap";



function SignupContainer(): ReactNode {

    const { setError } = useError();
    const { setLoggedIn } = useLoggedIn();
    const {setUser} = useUser()

    const [editProfileOpen, setEditProfileOpen] = useState(false)


  async function handleEdit(formData){

      try{
        const {user} = await FiskeAPI.editUser(formData, localStorage['fiske-token'])
        setUser(user)
      }catch (err){
        setError(err.message)
      }

  }
  function handleEditToggle(){
    setEditProfileOpen(!editProfileOpen)
  }


    return (
        <div className={styles.container}>
        {editProfileOpen && <EditProfileForm  handleEdit={handleEdit}/>}
        <Button onClick={handleEditToggle}></Button>
        </div>
    );
}

export default SignupContainer;