import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";

function Group({group}): ReactNode {

    return (
        <div>
            <h2>{group.name}</h2>
            <h2>{group.fish_species}</h2>
        </div>
    );
}

export default Group;