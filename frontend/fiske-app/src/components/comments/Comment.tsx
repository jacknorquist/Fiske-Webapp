import React from "react";
import { ReactNode} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { Link } from "react-router-dom";
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import styles from './css/Comment.module.css';
import { CommentType } from "../../types.ts";
import { UserType } from "../../types.ts";

type CommentProps={
    comment:CommentType;
    updatePost: ()=> void
}

/**Comment: Renders individual comment.
 *
 *Props:
 * - comment (obj): object containing comment data like...
 *   {content:'hello', user_id:5, username:'bob', user_profile_image:'link.com'}
 * - updatePost (function): function to update the PostListItem state
 *
 *State:
 * -none
 *
 * PostListItem -> CommentsContainer -> Comment
 */
function Comment({comment, updatePost}: CommentProps): ReactNode {

    const {user}:{user:UserType} = useUser();
    const {setMessage} = useMessage()

    async function deleteComment(){
        try{
         await FiskeAPI.deleteComment( localStorage['fiske-token'], comment.group_id, comment.post_id, comment.id);
         updatePost();
        }catch(err:unknown){
            if (err instanceof Error) {
                setMessage(err.message, 'error');
              }else{
                setMessage('An Unknown Error Occurred', 'error')
              }
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