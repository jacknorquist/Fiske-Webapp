import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import styles from './css/Comment.module.css'


/**Comment: Renders individual comment.
 *
 *Props:
 * - comment (string):
 * - updatePost (function): function to update the PostListItem state
 *
 *State:
 * -none
 *
 * PostListItem -> CommentsContainer -> Comment
 */
function Comment({comment, updatePost}): ReactNode {

    const {user} = useUser();
    const {setMessage} = useMessage()

    async function deleteComment(){
        try{
         await FiskeAPI.deleteComment( localStorage['fiske-token'], comment.group_id, comment.post_id, comment.id);
         updatePost();
        }catch (err){
          setMessage(err.message, 'error')
        }

    }




    return (
        <div className={styles.comment}>
            <Link to={`/profile/${comment.user_id}`}>
                <img src={comment.user_profile_image || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} alt="" className={styles.profileImage} />
            </Link>
            <div className={styles.grayBackGround}>
            <Link to={`/profile/${comment.user_id}`}>
                <i className={styles.username}>{comment.username}</i>
            </Link>
                <p className={styles.content}>{comment.content}</p>
                {user.id === comment.user_id ? <span onClick={deleteComment} className={`${styles.trashIcon} bi bi-trash`}></span>:""}
            </div>
        </div>
    );
}
export default Comment