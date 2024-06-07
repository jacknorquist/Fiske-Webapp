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
            {isEditProfileOpen && <EditProfileContainer toggleEditProfileForm={toggleEditProfileForm}/>}
            <div className={isEditProfileOpen?styles.overlay:styles.container}>
            <ProfileCard user={user} toggleEditProfileForm={toggleEditProfileForm}/>
            </div>
        </div>
    );
}

export default ProfileContainer;