import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";

function ProfileCard(): ReactNode {
    const [editProfileOpen, setEditProfileOpen] = useState(false)
    const {user} = useUser()
    return (
        <div>
            <h1>It worked</h1>
        </div>
    );
}

export default ProfileCard;