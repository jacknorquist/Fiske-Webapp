import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import Post from "../Post.tsx";

function GroupContainer({group, posts}): ReactNode {
    const {user} = useUser();
    const { id } = useParams();

    const 



    return (
        <div>

        </div>
    );
}

export default GroupContainer;