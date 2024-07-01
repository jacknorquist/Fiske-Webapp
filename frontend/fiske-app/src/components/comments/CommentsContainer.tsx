import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Comment from "./Comment.tsx";
import FiskeAPI from "../../api.ts";
import { useError } from "../../context/ErrorContext.tsx";


function CommentsContainer({comments}): ReactNode {

    const [commentsState, setCommentsState] = useState();
    const {setError} = useError();

    const {user} = useUser()


    async function deleteComment(groupId, postId, commentId){
        try{
         await FiskeAPI.deleteComment( localStorage['fiske-token'], groupId, postId, commentId);
        }catch (err){
          setError(err.message)
        }

    }

    return (
        <div>
            {comments.map(c=> <Comment comment={c} deleteComment={deleteComment}/>)}
        </div>
    );
}

export default CommentsContainer;