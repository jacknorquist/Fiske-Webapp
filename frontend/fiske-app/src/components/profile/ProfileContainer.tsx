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
import CreateGroupContainer from "../groups/CreateGroupContainer.tsx";


function ProfileContainer(): ReactNode {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
    const {user} = useUser();
    const [userPosts,  setUserPosts] = useState()
    const currentUserId = user!.id

    function toggleEditProfileForm(){
        setIsEditProfileOpen(!isEditProfileOpen)
      }

    function toggleCreateGroup(){
        setIsCreateGroupOpen(!isCreateGroupOpen)
      }


    return (
        <div>
        {isEditProfileOpen && <EditProfileContainer toggleEditProfileForm={toggleEditProfileForm}/>}
        {isCreateGroupOpen && <CreateGroupContainer toggleCreateGroup={toggleCreateGroup}/>}
        <div className={`${styles.gridcontainer} ${isEditProfileOpen || isCreateGroupOpen ? styles.overlay : ''}`}>
            <ProfileCard  toggleEditProfileForm={toggleEditProfileForm}/>
            <UserAdminGroupsContainer  toggleCreateGroup={toggleCreateGroup}/>
            <Fishboard />
            <UserPostsContainer  />
        </div>
        </div>
    );
}

export default ProfileContainer;