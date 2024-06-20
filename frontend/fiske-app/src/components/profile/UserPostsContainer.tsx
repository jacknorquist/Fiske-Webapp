import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import PostListItem from "../groups/GroupListItem.tsx";

function UserPostsContainer(): ReactNode {

    const {user} = useUser();
    const [userPosts,  setUserPosts] = useState([])
    const currentUserId = user!.id

    useEffect(() => {
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const posts = await FiskeAPI.getUserPosts(currentUserId, token );
             setUserPosts(posts)
           } catch (err) {
           } finally {
           }
         }
       };

       getPosts();
     }, []);
     console.log(userPosts)

    return (
        <div>
          <h1>User Posts</h1>
            {userPosts.length>0? userPosts.map(p=> <PostListItem post={p}/>): ""}
        </div>
    );
}

export default UserPostsContainer;