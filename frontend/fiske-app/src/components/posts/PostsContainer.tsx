import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";

function UserGroupsContainer(): ReactNode {
    const {user} = useUser()

    return (
        <div>
            <h1>Posts</h1>
        </div>
    );
}

export default UserGroupsContainer;