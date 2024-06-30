import React from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/UserGroupsContainer.module.css'
import FiskeAPI from "../../api.ts";

function UserAdminGroupsContainer(): ReactNode {

    const {user} = useUser();
    const [userAdminGroups,  setUserAdminGroups] = useState([])
    const currentUserId = user!.id

    useEffect(() => {
        async function getGroups() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const groups = await FiskeAPI.getAdminGroups(token, currentUserId);
             setUserAdminGroups(groups)
           } catch (err) {
           } finally {
           }
         }
       };

       getGroups();
     }, []);
     console.log(userAdminGroups)
    return (
        <div className={styles.container}>
            <h1>Grouphgs</h1>
        </div>
    );
}

export default UserAdminGroupsContainer;