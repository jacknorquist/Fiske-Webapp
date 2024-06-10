import React from "react";
import { ReactNode } from "react";
import styles from '../../css/profile/UserGroups.module.css'

function UserGroups(): ReactNode {
    return (
        <div className={styles.container}>
            <h1>Groups</h1>
        </div>
    );
}

export default UserGroups;