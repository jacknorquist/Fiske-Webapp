import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Comment from "./Comment.tsx";
import FiskeAPI from "../../api.ts";
import { useError } from "../../context/ErrorContext.tsx";
import styles from './css/CommentsContainer.module.css'


function CommentsContainer({comments, updatePost}): ReactNode {





    return (
        <div className={styles.container}>
            {comments.length > 0 ? comments.map(c=> <Comment comment={c} updatePost={updatePost}/>): <i>No comments yet.</i>}
        </div>
    );
}

export default CommentsContainer;