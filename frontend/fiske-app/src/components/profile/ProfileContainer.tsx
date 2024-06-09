import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import ProfileCard from "./ProfileCard.tsx";
import styles from '../../css/profile/ProfileContainer.module.css'
import EditProfileContainer from "./EditProfileContainer.tsx";


function ProfileContainer(): ReactNode {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
    const {user} = useUser()

    function toggleEditProfileForm(){
        setIsEditProfileOpen(!isEditProfileOpen)
      }



    return (
        <div>
            <div className={isEditProfileOpen?styles.overlay:styles.container}>
            <ProfileCard  toggleEditProfileForm={toggleEditProfileForm}/>
            </div>
            {isEditProfileOpen && <EditProfileContainer toggleEditProfileForm={toggleEditProfileForm}/>}
        </div>
    );
}

export default ProfileContainer;