import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import FiskeAPI from "../../api.ts";
import { useError } from "../../context/ErrorContext.tsx";

function Comment({comment}): ReactNode {

    const {user} = useUser();
    const {setError} = useError()

    async function deleteComment(){
        try{
         await FiskeAPI.deleteComment( localStorage['fiske-token'], comment.group_id, comment.post_id, comment.id);
        }catch (err){
          setError(err.message)
        }

    }




    return (
        <div>
            <p>{comment.username}</p>
            <p>{comment.content}</p>
            {user.id === comment.user_id ? <Button onClick={deleteComment}>Delete</Button>:""}
        </div>
    );
}
export default Comment