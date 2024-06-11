import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

function GroupLink({name}): ReactNode {
    return (
        <div>
        <Link to={`groups/${name}`}>{name}</Link>
        </div>
    );
}

export default GroupLink;