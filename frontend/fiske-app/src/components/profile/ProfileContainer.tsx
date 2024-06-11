import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import ProfileCard from "./ProfileCard.tsx";
import styles from '../../css/profile/ProfileContainer.module.css'
import EditProfileContainer from "./EditProfileContainer.tsx";
import Fishboard from "./Fishboard.tsx";
import UserGroups from "./UserGroupsContainer.tsx";
import UserPostsContainer from "./UserPostsContainer.tsx";


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
            <UserPostsContainer />
            <UserGroups />
            <Fishboard />
        </div>
        </div>
    );
}

export default ProfileContainer;