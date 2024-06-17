import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";


function UserGroupsContainer({groups}): ReactNode {
    const {user} = useUser()



    return (
        <div>
            <h1>UserGroups</h1>
        </div>
    );
}

export default UserGroupsContainer;