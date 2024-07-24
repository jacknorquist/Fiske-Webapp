import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Comment from "./Comment.tsx";
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import styles from './css/CommentsContainer.module.css'
import CreateCommentForm from "./CreateCommentForm.tsx";


function CommentsContainer({comments, updatePost, createComment}): ReactNode {





    return (
        <div className={styles.container}>
            <CreateCommentForm createComment={createComment} updatePost={updatePost}/>
            {comments.length > 0 ? comments.map(c=> <Comment comment={c} updatePost={updatePost}/>): <i style={{ marginLeft: '.5rem' }}>No comments yet.</i>}
        </div>
    );
}

export default CommentsContainer;