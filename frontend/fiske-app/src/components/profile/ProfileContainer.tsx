import React from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useLoggedIn } from "../../context/LoggedInContext.tsx";
import ProfileCard from "./ProfileCard.tsx";
import styles from './css/ProfileContainer.module.css';
import EditProfileContainer from "./EditProfileContainer.tsx";
import Fishboard from "./Fishboard.tsx";
import UserAdminGroupsContainer from "./UserAdminGroupsContainer.tsx";
import FiskeAPI from "../../api.ts";
import UserPostsContainer from "./UserPostsContainer.tsx";


function ProfileContainer(): ReactNode {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
    const {user} = useUser();
    const [userPosts,  setUserPosts] = useState()
    const currentUserId = user!.id

    function toggleEditProfileForm(){
        setIsEditProfileOpen(!isEditProfileOpen)
      }


    return (
        <div>
        {isEditProfileOpen && <EditProfileContainer toggleEditProfileForm={toggleEditProfileForm}/>}
        <div className={`${styles.gridcontainer} ${isEditProfileOpen ? styles.overlay : ''}`}>
            <ProfileCard  toggleEditProfileForm={toggleEditProfileForm}/>
            <UserAdminGroupsContainer />
            <Fishboard />
            <UserPostsContainer  />
        </div>
        </div>
    );
}

export default ProfileContainer;