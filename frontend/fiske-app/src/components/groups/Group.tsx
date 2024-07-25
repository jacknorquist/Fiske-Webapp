import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

//TODO: Find if component is needed

/**Group: renders link to a group
 *
 *Props:
 * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 *
 *State:
 * -none
 */
function Group({group}): ReactNode {

    return (
        <div>
            <Link to={`/groups/${group.id}`}>{group.name}</Link>

        </div>
    );
}

export default Group;