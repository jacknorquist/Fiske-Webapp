import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Group({group}): ReactNode {

    return (
        <div>
            <Link to={`/groups/${group.id}`}>{group.name}</Link>
        </div>
    );
}

export default Group;