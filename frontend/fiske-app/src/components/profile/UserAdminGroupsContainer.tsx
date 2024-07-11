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


    return (

        <div className={styles.container}>
            <h1>Admin Groups</h1>
            {userAdminGroups.length > 0 ? userAdminGroups.map(g => <GroupListItem group={g} />): ""}
            {profileIsUser ?  <Button onClick={toggleCreateGroup}>Create Group</Button>:""}
        </div>
    );
}

export default UserAdminGroupsContainer;