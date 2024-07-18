import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import GroupListItem from "../groups/GroupListItem.tsx";
import styles from './css/UserGroupsContainer.module.css';
import { v4 as uuidv4 } from 'uuid';

function UserGroupsContainer({profileUser}): ReactNode {

    const {user} = useUser();
    const [userGroups,  setUserGroups] = useState([]);
    const [isGroupsOpen, setIsGroupsOpen] = useState(false)

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

    function toggleIsGroupsOpen(){
      setIsGroupsOpen(!isGroupsOpen)
    }

    return (
        <div className={styles.container}>
          <div onClick={toggleIsGroupsOpen} className={styles.header}>
          <h6 >User Groups</h6>
          {isGroupsOpen? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}
          </div>
          {isGroupsOpen ?
          <div className={styles.groups}>
            {userGroups.length>0? userGroups.map(g=> <GroupListItem key={uuidv4()} group={g}/>): <p>You haven't joined any groups yet.</p>}
          </div> :""}
        </div>
    );
}

export default UserGroupsContainer;