import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";

function Post({post}): ReactNode {

    return (
        <div>
            <h1>{post.title}</h1>
        </div>
    );
}

export default Post;