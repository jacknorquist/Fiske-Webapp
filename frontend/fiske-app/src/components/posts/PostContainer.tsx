import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import Group from "./Group.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import CommentsContainer from "../comments/CommentsContainer.tsx";
import { Button } from "reactstrap";

function PostContainer(): ReactNode {
    const {user} = useUser();
    const [post, setPost] = useState(null)
    const {id } = useParams();
    const currentUserId = user!.id
    const [userMember, setUserMember] = useState(false)

    useEffect(() => {
        async function getPost() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const post = await FiskeAPI.getPost( token, id);

             setPost(post)
           } catch (err) {
           } finally {
           }
         }
       };

       getPost();
     }, []);

    return (
        <div>
            {post? <h1>Title:{post.post.title}</h1>: ""}
            {post ? post.post.images.map(i=> <div><img src={i} alt="" /></div>):""}
            {post ? <CommentsContainer comments={post.comments} />:""}
        </div>
    );
}

export default PostContainer;