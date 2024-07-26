import React from "react";
import { ReactNode} from "react";
import Comment from "./Comment.tsx";
import styles from './css/CommentsContainer.module.css'
import CreateCommentForm from "./CreateCommentForm.tsx";
import { CommentType, CommentFormDataType, CommentsContainerPropsType } from "../../types.ts"


/**CommentsContainer: Renders all comments for a post.
 *
 *Props:
 * - comments (array): array of comments
 * - updatePost (function): function to update the PostListItem state
 * - createComment (function): function to create a comment
 *State:
 * -none
 *
 * PostListItem -> CommentsContainer -> Comment
 */
function  CommentsContainer({
                             comments,
                             updatePost,
                             createComment
                            }: CommentsContainerPropsType): ReactNode {

    return (
        <div className={styles.container}>
            <CreateCommentForm createComment={createComment} updatePost={updatePost}/>
            {comments.length > 0 ?
            comments.map(c=> <Comment comment={c} updatePost={updatePost}/>)
            :
            <i style={{ marginLeft: '.5rem' }}>No comments yet.</i>}
        </div>
    );
}

export default CommentsContainer;