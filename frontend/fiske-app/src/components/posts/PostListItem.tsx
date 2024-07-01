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
    const {setError} = useError()
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    function toggleComments(){
        setIsCommentsOpen(true)
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
            <h2>Title:{post.title}</h2>
            <Link to={`/groups/${post.group_id}`}><h6>Group:{post.group_name}</h6></Link>
            <h3>{post.content}</h3>
            <h3>{post.created_at}</h3>
            {post.images.length > 0 ? post.images.map(i=><img src={i}/>):""}
            <CreateCommentForm createComment={createComment}/>
            {isCommentsOpen ? <CommentsContainer comments={post.comments}/>:<Button onClick={toggleComments}><p>Comments</p></Button>}
        </div>
    );
}

export default PostListItem;