import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/UserAdminGroupsContainer.module.css'
import GroupListItem from "../groups/GroupListItem.tsx";
import { v4 as uuidv4 } from 'uuid';
import {UserAdminGroupsContainerPropsType } from "../../types.ts";


/**UserAdminGroupsContainer: renders GroupListItems for groups that user has created
 *
 *Props:
 * - toogleCreateGroup (function): toggles CreateGroupContainer visibility
 * - userAdminGroups (array): array containing objects of groups that the user has created
 * - profileIsUser (boolean) : if true, allow user to create group
 *
 *State:
 * - isGroupsOpen (boolean): if true, renders GroupListItems
 *
 * RoutesList -> ProfileContainer -> UserAdminGroupsContainer -> GroupListItem
 */
function UserAdminGroupsContainer({
                                   toggleCreateGroup,
                                   userAdminGroups,
                                   profileIsUser
                                  }:UserAdminGroupsContainerPropsType): ReactNode {

    const[isGroupsOpen ,setIsGroupsOpen] = useState<boolean>(false);

    //toggles isGroupsOpen
    function toggleGroupsOpen(){
        setIsGroupsOpen(!isGroupsOpen);
    }


    return (
        <div onClick={toggleGroupsOpen} className={styles.container}>
            <div onClick={toggleGroupsOpen}  className={styles.header}>
                <h6>Admin Groups</h6>
                {profileIsUser ?
                <p className={styles.addIcon} onClick={toggleCreateGroup}>+</p>
                :""}
                {isGroupsOpen?
                <i className="bi bi-arrow-up"></i>
                :
                <i className="bi bi-arrow-down"></i>}
            </div>
            {isGroupsOpen ?
            <div className={styles.groups}>
                {userAdminGroups.length > 0 ?
                 userAdminGroups.map(g => <GroupListItem key={uuidv4()} group={g} />)
                :
                <p>No groups created yet...</p>}
            </div>
            :
            ""}
        </div>
    );
}

export default UserAdminGroupsContainer;