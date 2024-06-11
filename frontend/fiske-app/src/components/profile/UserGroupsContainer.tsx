import React from "react";
import { ReactNode, useEffect, useState } from "react";
import styles from '../../css/profile/UserGroupsContainer.module.css'
import FiskeAPI from "../../api.ts";
import { useUser } from "../../context/UserContext.tsx";
import { useError } from "../../context/ErrorContext.tsx";
import GroupLink from "./GroupLink.tsx";

function UserGroupsContainer(): ReactNode {
    const {user} = useUser();
    const [userGroups, setUserGroups] = useState(null)
    const {setError} = useError();
    const currentUserId = user!.id
    useEffect(() => {
        const getGroups = async () => {
        const token = localStorage.getItem('fiske-token');
        if (token) {
            try {
                const groups = await FiskeAPI.getUserGroups(currentUserId, token);
                if (groups.length > 0) setUserGroups(groups)
            } catch (err) {
                setError(err)
            }
        }
        };

    getGroups();
    }, []);



    return (
        <div className={styles.container}>
        {userGroups ? (
        userGroups.map(group => <GroupLink key={group.id} name={group.name} />)
      ) : (
        <p>No groups found</p>
      )}
        </div>
    );
}

export default UserGroupsContainer;