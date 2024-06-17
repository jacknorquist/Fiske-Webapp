import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";

function ExploreGroupsContainer({groups}): ReactNode {
    const {user} = useUser()



    return (
        <div>
            <h1>Explore Groups Container</h1>
        </div>
    );
}

export default ExploreGroupsContainer;