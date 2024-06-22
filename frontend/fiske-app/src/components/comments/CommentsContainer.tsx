import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function CommentsContainer({post}): ReactNode {
    const [postComments, setPostComments] = useState(post.comments || null)

    return (
        <div>
            {postComments ? postComments.map(c=> <p className="comment">{c.content}</p>):null}
        </div>
    );
}

export default CommentsContainer;