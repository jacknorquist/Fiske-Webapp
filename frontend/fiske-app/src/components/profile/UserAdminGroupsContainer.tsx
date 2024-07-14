import React from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/UserAdminGroupsContainer.module.css'
import FiskeAPI from "../../api.ts";
import GroupListItem from "../groups/GroupListItem.tsx";
import Group from "../groups/Group.tsx";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

function UserAdminGroupsContainer({toggleCreateGroup, userAdminGroups, profileIsUser}): ReactNode {

    const[isGroupsOpen ,setIsGroupsOpen] = useState(false)

    const {user} = useUser();
    // const [userAdminGroups,  setUserAdminGroups] = useState([])
    const currentUserId = user!.id

    // useEffect(() => {
    //     async function getGroups() {
    //      const token = localStorage.getItem('fiske-token');
    //      if (token) {
    //        try {
    //          const groups = await FiskeAPI.getUserAdminGroups(token, currentUserId);
    //          setUserAdminGroups(groups)
    //        } catch (err) {
    //        } finally {
    //        }
    //      }
    //    };

    //    getGroups();
    //  }, []);


    function toggleGroupsOpen(){
        setIsGroupsOpen(!isGroupsOpen)
    }


    return (

        <div onClick={toggleGroupsOpen} className={styles.container}>
            <div onClick={toggleGroupsOpen}  className={styles.header}>
            <h6>Admin Groups</h6>
            {profileIsUser ?  <p className={styles.addIcon} onClick={toggleCreateGroup}>+</p>:""}
            {isGroupsOpen? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}
            </div>
            {isGroupsOpen ? <div className={styles.groups}> {userAdminGroups.length > 0 ? userAdminGroups.map(g => <GroupListItem group={g} />): ""}</div>:""}
        </div>
    );
}

export default UserAdminGroupsContainer;