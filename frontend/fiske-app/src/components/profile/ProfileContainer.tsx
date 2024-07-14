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
import UserGroupsContainer from "./UserGroupsContainer.tsx";
import { useParams } from "react-router-dom";
import FishboardContainer from "../Fishboard/FishboardContainer.tsx";


function ProfileContainer(): ReactNode {
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
    const [profileUser, setProfileUser] = useState();
    const { id } = useParams();
    const {user} = useUser();
    const [userAdminGroups, setUserAdminGroups] = useState([])
    const currentUserId = user.id


    function toggleCreateGroup(){
        setIsCreateGroupOpen(!isCreateGroupOpen)
      }

    useEffect(() => {
        async function getGroups() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const groups = await FiskeAPI.getUserAdminGroups(token, id);
             const user = await FiskeAPI.getUser(token, id )
             setUserAdminGroups(groups);
             setProfileUser(user)
           } catch (err) {
           } finally {
           }
         }
       };

       getGroups();
     }, [id]);


     function updateProfileUser(){
      async function getUser() {
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const user = await FiskeAPI.getUser(token, id )
            setProfileUser(user)
          } catch (err) {
          } finally {
          }
        }
      };

      getUser();
     }


     function updateUserAdminGroups(){
      async function getGroups() {
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const groups = await FiskeAPI.getUserAdminGroups(token, id);
            setUserAdminGroups(groups)
          } catch (err) {
          } finally {
          }
        }
      };

      getGroups();
     }

     let profileIsUser = currentUserId === Number(useParams().id)
    return (
        <div className={styles.profileContainer}>
          {isCreateGroupOpen && <CreateGroupContainer toggleCreateGroup={toggleCreateGroup} updateUserAdminGroups={updateUserAdminGroups}/>}
          <div className={`${styles.gridcontainer} ${ isCreateGroupOpen ? styles.overlay : ''}`}>
            {profileUser ?
            <div className={styles.leftContainer}>
              <ProfileCard  updateProfileUser= {updateProfileUser} profileIsUser={profileIsUser} profileUser={profileUser}/>
              <div className={styles.fishboardContainer}>
              <FishboardContainer fishboard={profileUser.fishboard}  fishBoardType={'UserFishboard'} profileIsUser={profileIsUser}/>
              </div>
              <UserPostsContainer  profileUser={profileUser} />
            </div> :""
}
            {profileUser ?
            <div className={styles.rightContainer}>
              {userAdminGroups ? <UserAdminGroupsContainer  toggleCreateGroup={toggleCreateGroup} userAdminGroups={userAdminGroups} profileIsUser={profileIsUser}/> :""}
              <UserGroupsContainer profileUser={profileUser} />
            </div>:""
}

          </div >
        </div>
    );
}

export default ProfileContainer;