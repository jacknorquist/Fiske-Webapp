import React from "react";
import { ReactNode , useState, useRef} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link} from "react-router-dom";
import { Button } from "reactstrap";
import CommentsContainer from "../comments/CommentsContainer.tsx";
import CreateCommentForm from "../comments/CreateCommentForm.tsx";
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import styles from './css/PostListItem.module.css'
import PostImageGallery from "./PostImageGallery.tsx";
import timeAgo from "../../helpers/timgeAgo.ts";




/**PostListItem: renders individual post
 *
 *Props:
 * - post (obj): object containing individual post data like...
 *      {content:'hello',
 *       user_profile_image:'image.com',
 *       images:['image.com],
 *       group_id:2,
 *       group_name:'Walleye Fishing',
 *       username:'bob',
 *       comments:[{content:'hello', user_id:5, username:'bob', user_profile_image:'link.com'}] }
 * - updatePosts (function): function to update posts if one is deleted
 *
 *State:
 * - postState (obj): object containing individual post data
 * - isCommentsOpen (boolean): if true, CommentsContainer is rendered
 * - isButtonsOpen (boolean): if true, utitliy box is rendered
 * - isExpanded (boolean): if true, all content in post is displayed
 *
 * Homepage & GroupContainer & PostsContainer and UserPostsContainer -> PostListItem -> PostImageGallery & CommentsContainer
 */
function PostListItem({post, updatePosts}): ReactNode {
    const {user} = useUser()
    const {setMessage} = useMessage();
    const[postState, setPostState] = useState(post);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const[isButtonsOpen, setIsButtonsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);

    //toggle isCommentsOpen to render CommentsContainer
    function toggleComments(){
        setIsCommentsOpen(true)
    }

    //update post
    async function updatePost(){
        try{
            const updatedPost = await FiskeAPI.getPost( localStorage['fiske-token'], post.id);
            setPostState(updatedPost)
           }catch (err){
             setMessage(err.message, 'error')
           }
    }

    //create comment
    async function createComment(formData){
        try{
         await FiskeAPI.createComment( localStorage['fiske-token'], post.group_id, post.id, formData);
        }catch (err){
          setMessage('An error occurred', 'error')
        }

    }

    //delete post
    async function deletePost(){
        try{
            await FiskeAPI.deletePost( localStorage['fiske-token'], post.group_id, post.id);
            updatePosts()
           }catch (err){
             setMessage(err.message, 'error')
           }
    }

    //toggle isButtonsOpen to render utility box
    function toggleButtons(){
        setIsButtonsOpen(!isButtonsOpen)
    }

    //toggle isExpanded to display entire content in post
    function toggleExpand(){
        setIsExpanded(true)
    }


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to={`/profile/${postState.user_id}`} >
                    <img src={postState.user_profile_image || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} alt="" className={styles.profileImage}/>
                </Link>
                <div className={styles.groupUser}>
                        <Link to={`/groups/${postState.group_id}`} className={styles.grouplink}><h6>{postState.group_name}</h6></Link>
                        <Link to={`/profile/${postState.user_id}`}>
                            <i className={styles.username}>{postState.username}</i>
                        </Link>
                        <i style={{color:'gray'}}> posted {timeAgo(postState.created_at)}</i>
                </div>
            </div>
            <span onClick={toggleButtons}className={`${styles.openButtonsIcon} bi bi-three-dots-vertical`}></span>
            {isButtonsOpen ?
             <div className={styles.buttonscontainer}>
                {post.user_id === user.id ? <span onClick={deletePost} className={`${styles.icon} bi bi-trash icon`}></span>:"" }
             </div> : ""
             }
            <div className={styles.content}>
                {isExpanded? <div className={styles.contentTextExpanded}><p>{postState.content}</p></div>: <div className={styles.contentText}><p>{postState.content}</p></div>}
                {!isExpanded ? <i style={{cursor:'pointer'}}onClick={toggleExpand}>Read More</i>:""}
            </div>
            {postState.images.length > 0 ? <PostImageGallery  images={postState.images}/>:""}
            <div className={styles.socialContainer}>
                {!isCommentsOpen ? <p onClick={toggleComments} className={styles.icon}>Comments</p>: ""}
            </div>
            {isCommentsOpen ? <CommentsContainer comments={postState.comments} updatePost={updatePost} createComment={createComment}/>:""}
        </div>
    );
}

export default PostListItem;