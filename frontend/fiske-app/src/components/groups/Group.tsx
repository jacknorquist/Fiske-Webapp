import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function Group({group}): ReactNode {

    return (
        <div>
            <Link to={`/groups/${group.id}`}>{group.name}</Link>

        </div>
    );
}

export default Group;