import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import FiskeAPI from "../../api.ts";
import CommentsContainer from "../comments/CommentsContainer.tsx";
import { useMessage } from "../../context/MessageContext.tsx";

//TODO: I don't think this is being used
/**PostContainer: renders form to create a post
 *
 *Props:
 * - createPost (function): creates post
 * - toggleCreatePost (function): toogles visibility of CreatePostContainer
 *
 *State:
 * - formData (obj): data for the form
 * - images (array): handles the amount of images available to add to a post
 * ProfileContainer -> CreateGroupContainer -> CreateGroupForm
 */
function PostContainer(): ReactNode {
    const {user} = useUser();
    const {setMessage} = useMessage()
    const [post, setPost] = useState(null)
    const {id } = useParams();
    const currentUserId = user.id
    const [userMember, setUserMember] = useState(false)

    useEffect(() => {
        async function getPost() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const post = await FiskeAPI.getPost( token, id);

             setPost(post)
           } catch (err) {
            setMessage('An error occurred', 'error')
           } finally {
           }
         }
       };

       getPost();
     }, []);
     console.log(post)

    return (
        <div>
            {post? <h1>Title:{post.post.title}</h1>: ""}
            {post ? post.post.images.map(i=> <div><img src={i} alt="" /></div>):""}
            {post ? <CommentsContainer comments={post.comments} />:""}
        </div>
    );
}

export default PostContainer;