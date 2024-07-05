import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import GroupListItem from "../groups/GroupListItem.tsx";
import styles from './css/UserGroupsContainer.module.css';

function UserGroupsContainer(): ReactNode {

    const {user} = useUser();
    const [userGroups,  setUserGroups] = useState([])
    const currentUserId = user!.id

    useEffect(() => {
        async function getGroups() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const Groups = await FiskeAPI.getUserGroups( token, currentUserId);
             setUserGroups(Groups)
           } catch (err) {
           } finally {
           }
         }
       };

       getGroups();
     }, []);

    function updateGroups(){
      async function getGroups() {
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const Groups = await FiskeAPI.getUserGroups( token, currentUserId);
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