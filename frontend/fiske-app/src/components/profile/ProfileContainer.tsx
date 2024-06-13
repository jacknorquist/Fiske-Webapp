import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import ProfileCard from "./ProfileCard.tsx";
import styles from './css/ProfileContainer.module.css'
import EditProfileContainer from "./EditProfileContainer.tsx";
import Fishboard from "./Fishboard.tsx";
import UserPosts from "./UserPosts.tsx";
import UserGroups from "./UserGroups.tsx";


function ProfileContainer(): ReactNode {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
    const {user} = useUser()

    function toggleEditProfileForm(){
        setIsEditProfileOpen(!isEditProfileOpen)
      }



    return (
        <div>
        {isEditProfileOpen && <EditProfileContainer toggleEditProfileForm={toggleEditProfileForm}/>}
        <div className={`${styles.gridcontainer} ${isEditProfileOpen ? styles.overlay : ''}`}>
            <ProfileCard  toggleEditProfileForm={toggleEditProfileForm}/>
            <UserGroups />
            <Fishboard />
            <UserPosts />
        </div>
        </div>
    );
}

export default ProfileContainer;