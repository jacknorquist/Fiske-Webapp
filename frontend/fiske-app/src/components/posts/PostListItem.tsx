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

function PostListItem({post}): ReactNode {
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
    return (
        <div style={{border:'1px solid black'}}>
            <h2>Title:{postState.title}</h2>
            <Link to={`/groups/${postState.group_id}`}><h6>Group:{postState.group_name}</h6></Link>
            <h3>{postState.content}</h3>
            <h3>{postState.created_at}</h3>
            {postState.images.length > 0 ? postState.images.map(i=><img src={i}/>):""}
            <CreateCommentForm createComment={createComment} updatePost={updatePost}/>
            {isCommentsOpen ? <CommentsContainer comments={postState.comments} updatePost={updatePost}/>:<Button onClick={toggleComments}><p>Comments</p></Button>}
        </div>
    );
}

export default PostListItem;