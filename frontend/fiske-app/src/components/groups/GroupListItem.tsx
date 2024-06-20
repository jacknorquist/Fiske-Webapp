import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function GroupListItem({group}): ReactNode {

    return (
        <div style={{border:'1px solid black'}}>
            <Link to={`/groups/${group.id}`}><h1>{group.name}</h1></Link>
            <h2>{group.species}</h2>
            <h3>{group.fish_species}</h3>
            <h3>{group.area}</h3>
        </div>
    );
}

export default GroupListItem;