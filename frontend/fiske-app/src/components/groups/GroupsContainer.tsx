import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExploreGroupsContainer from "./ExploreGroupsContainer.tsx";
import UserGroupsContainer from "./UserGroupsContainer.tsx";
import { Button } from "reactstrap";

function GroupsContainer(): ReactNode {
    const {user} = useUser()
    const [exploreGroupsContainerOpen, setExploreGroupsContainer] = useState(false)

    function openExploreGroups(){
        if (exploreGroupsContainerOpen) return
        setExploreGroupsContainer(true)
    }

    function openUserGroups(){
        if (!exploreGroupsContainerOpen) return
        setExploreGroupsContainer(false)
    }



    return (
        <div>
            <Button onClick={openUserGroups} >My Groups</Button>
            <Button onClick={openExploreGroups}>Explore</Button>
            {exploreGroupsContainerOpen? <ExploreGroupsContainer />:<UserGroupsContainer />}
        </div>
    );
}

export default GroupsContainer;