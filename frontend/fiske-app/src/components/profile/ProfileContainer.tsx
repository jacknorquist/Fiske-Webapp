import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ProfileCard from "./ProfileCard.tsx";
import styles from '../../css/ProfileContainer.module.css'


function ProfileContainer(): ReactNode {
    const [editProfileOpen, setEditProfileOpen] = useState(false)
    const {user} = useUser()
    return (
        <div className={styles.container}>
           <ProfileCard user={user}/>
        </div>
    );
}

export default ProfileContainer;