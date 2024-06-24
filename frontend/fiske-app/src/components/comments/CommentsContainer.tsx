import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function CommentsContainer({comments}): ReactNode {

    return (
        <div>
            {comments ? comments.map(c=> <p className="comment">{c.content}</p>):null}
        </div>
    );
}

export default CommentsContainer;