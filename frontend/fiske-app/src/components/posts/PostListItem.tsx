import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import CommentsContainer from "../comments/CommentsContainer.tsx";
import CreateCommentForm from "../comments/CreateCommentForm.tsx";
import FiskeAPI from "../../api.ts";
import { useError } from "../../context/ErrorContext.tsx";
import styles from './css/PostListItem.module.css'

function PostListItem({post, updatePosts}): ReactNode {
    const {user} = useUser()
    const {setError} = useError();
    const[postState, setPostState] = useState(post);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    function toggleComments(){
        setIsCommentsOpen(true)
    }

    async function updatePost(){
        try{
            const updatedPost = await FiskeAPI.getPost( localStorage['fiske-token'], post.id);
            setPostState(updatedPost)
           }catch (err){
             setError(err.message)
           }
    }

    async function createComment(formData){
        try{
         await FiskeAPI.createComment( localStorage['fiske-token'], post.group_id, post.id, formData);
        }catch (err){
          setError(err.message)
        }

    }

    async function deletePost(){
        try{
            await FiskeAPI.deletePost( localStorage['fiske-token'], post.group_id, post.id);
            updatePosts()
           }catch (err){
             setError(err.message)
           }
    }


    return (
        <div className={styles.container}>
            <Link to={`/groups/${postState.group_id}`} className={styles.grouplink}><h6>Group:{postState.group_name}</h6></Link>
            <h5 className={styles.title}>{postState.title}</h5>
            <i className={styles.createdat}>{postState.created_at}</i>
            <p className={styles.content}>{postState.content}</p>
            {postState.images.length > 0 ? postState.images.map(i=><img src={i}/>):""}
            <CreateCommentForm createComment={createComment} updatePost={updatePost}/>
            <div className={styles.buttonscontainer}>
            {post.user_id === user.id ? <span onClick={deletePost} className={`${styles.icon} bi bi-trash`}></span>:"" }
            {!isCommentsOpen ? <p onClick={toggleComments} className={styles.icon}>Comments</p>: ""}
            </div>
            {isCommentsOpen ? <CommentsContainer comments={postState.comments} updatePost={updatePost}/>:""}
        </div>
    );
}

export default PostListItem;