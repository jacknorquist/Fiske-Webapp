import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function PostListItem({post}): ReactNode {

    return (
        <div style={{border:'1px solid black'}}>
             <Link to={`/posts/${post.id}`}><h2>Title:{post.title}</h2></Link>
            <h3>{post.content}</h3>
            <h3>{post.created_at}</h3>
            <Link to={`/groups/${post.group_id}`}><h6>Group:{post.group_name}</h6></Link>
        </div>
    );
}

export default PostListItem;