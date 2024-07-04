import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import styles from './css/GroupListItem.module.css'

function GroupListItem({group}): ReactNode {

    return (
        <div className={styles.container}>
            <Link to={`/groups/${group.id}`} className={styles.grouplink}><h6>{group.name}</h6></Link>
            {isButtonsOpen ?
             <div className={styles.buttonscontainer}>
             {post.user_id === user.id ? <span onClick={deletePost} className={`${styles.icon} bi bi-trash icon`}></span>:"" }
             </div> : ""
             }
            <h5 className={styles.title}>{postState.title}</h5>
            <i className={styles.createdat}>{postState.created_at}</i>
            <p className={styles.content}>{postState.content}</p>
            {postState.images.length > 0 ? <PostImageGallery  images={postState.images}/>:""}
             <div className={styles.socialContainer}>
            {!isCommentsOpen ? <p onClick={toggleComments} className={styles.icon}>Comments</p>: ""}
            </div>
            <span onClick={toggleButtons}className={`${styles.openButtonsIcon} bi bi-three-dots-vertical`}></span>

            {isCommentsOpen ? <CommentsContainer comments={postState.comments} updatePost={updatePost} createComment={createComment}/>:""}
        </div>
    );
}

export default GroupListItem;