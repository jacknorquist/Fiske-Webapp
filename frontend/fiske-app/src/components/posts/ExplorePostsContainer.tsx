import React from "react";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import FiskeAPI from "../../api.ts";
import Post from "./Post.tsx";

function ExplorePostsContainer(): ReactNode {
    const {user} = useUser()
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
           } finally {
           }
         }
       };

       getPosts();
     }, []);


    return (
        <div>
            {posts.length>0 ? posts.map(p=><Post key={p!.title} post={p}/>): ""}
        </div>
    );
}

export default ExplorePostsContainer;