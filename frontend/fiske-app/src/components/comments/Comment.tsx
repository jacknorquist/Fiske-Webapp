import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import FiskeAPI from "../../api.ts";
import { useError } from "../../context/ErrorContext.tsx";
import styles from './css/Comment.module.css'

function Comment({comment, updatePost}): ReactNode {

    const {user} = useUser();
    const {setError} = useError()

    async function deleteComment(){
        try{
         await FiskeAPI.deleteComment( localStorage['fiske-token'], comment.group_id, comment.post_id, comment.id);
         updatePost()
        }catch (err){
          setError(err.message)
        }

    }




    return (
        <div className={styles.comment}>
            <div className={styles.nameTrash}>
                <i>{comment.username}</i>
                {user.id === comment.user_id ? <span onClick={deleteComment} className={`${styles.icon} bi bi-trash`}></span>:""}
            </div>
                <p className={styles.content}>{comment.content}</p>
        </div>
    );
}
export default Comment