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
    const [userAdminGroups, setUserAdminGroups] = useState([])
    const [userPosts,  setUserPosts] = useState()
    const currentUserId = user!.id

    function toggleEditProfileForm(){
        setIsEditProfileOpen(!isEditProfileOpen)
      }

    function toggleCreateGroup(){
        setIsCreateGroupOpen(!isCreateGroupOpen)
      }

    useEffect(() => {
        async function getGroups() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const groups = await FiskeAPI.getUserAdminGroups(token, currentUserId);
             setUserAdminGroups(groups)
           } catch (err) {
           } finally {
           }
         }
       };

       getGroups();
     }, [userAdminGroups]);

     function updateUserAdminGroups(){
        setUserAdminGroups([])
     }


    return (
        <div>
        {isEditProfileOpen && <EditProfileContainer toggleEditProfileForm={toggleEditProfileForm}/>}
        {isCreateGroupOpen && <CreateGroupContainer toggleCreateGroup={toggleCreateGroup} updateUserAdminGroups={updateUserAdminGroups}/>}
        <div className={`${styles.gridcontainer} ${isEditProfileOpen || isCreateGroupOpen ? styles.overlay : ''}`}>
            <ProfileCard  toggleEditProfileForm={toggleEditProfileForm}/>
            {userAdminGroups.length > 0 ? <UserAdminGroupsContainer  toggleCreateGroup={toggleCreateGroup} userAdminGroups={userAdminGroups}/> :""}
            <Fishboard />
            <UserPostsContainer  />
        </div>
        </div>
    );
}

export default ProfileContainer;