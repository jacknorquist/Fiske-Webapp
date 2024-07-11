import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import GroupListItem from "../groups/GroupListItem.tsx";
import styles from './css/UserGroupsContainer.module.css';

function UserGroupsContainer({profileUser}): ReactNode {

    const {user} = useUser();
    const [userGroups,  setUserGroups] = useState([]);

    useEffect(() => {
        async function getGroups() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const groups = await FiskeAPI.getUserGroups( token, profileUser.user.id);
             setUserGroups(groups)
           } catch (err) {
           } finally {
           }
         }
       };

       getGroups();
     }, [profileUser]);

    function updateGroups(){
      async function getGroups() {
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const Groups = await FiskeAPI.getUserGroups( token,  profileUser.user.id);
            setUserGroups(Groups)
          } catch (err) {
          } finally {
          }
        }
      };

      getGroups();
    }

    return (
        <div className={styles.container}>
          <h1 >User Groups</h1>
            {userGroups.length>0? userGroups.map(g=> <GroupListItem group={g}/>): ""}
        </div>
    );
}

export default UserGroupsContainer;