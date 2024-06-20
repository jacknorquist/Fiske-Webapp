import React, { useState } from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";
import { Link } from "react-router-dom";

function Post({post}): ReactNode {
    const [group, setGroup] = useState()

    return (
        <div style={{border:'1px solid black'
        }}>
            <h1>{post.title}</h1>
            <Link to={`/groups/${post.group_id}`}><h1>{post.group_name}</h1></Link>
        </div>
    );
}

export default Post;