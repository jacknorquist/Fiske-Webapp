import React from "react";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import FiskeAPI from "../../api.ts";
import Post from "./PostContainer.tsx";
import PostListItem from "./PostListItem.tsx";
import { useMessage } from "../../context/MessageContext.tsx";

function ExplorePostsContainer(): ReactNode {
    const {user} = useUser()
    const {setMessage} = useMessage()
    const [posts, setPosts] = useState([]);
    const currentUserId = user!.id;

    useEffect(() => {
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const posts = await FiskeAPI.getExplorePosts( token );
             setPosts(posts)
           } catch (err) {
              setMessage('An error occurred', 'error')
           } finally {
           }
         }
       };

       getPosts();
     }, [posts]);

     function updatePosts(){
      setPosts([])
     }

    return (
        <div>
            {posts.length>0 ? posts.map(p=><PostListItem key={p!.title} post={p} updatePosts={updatePosts}/>): ""}
        </div>
    );
}

export default ExplorePostsContainer;