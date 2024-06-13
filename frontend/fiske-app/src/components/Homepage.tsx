import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import GroupsContainer from "./groups/GroupsContainer.tsx";

function Homepage(): ReactNode {
    return (
        <div>
            <h1>Home</h1>
            <GroupsContainer />
        </div>
    );
}

export default Homepage;