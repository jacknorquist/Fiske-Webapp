import React, { useState } from "react";
import { ReactNode, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExplorePostsContainer from "./ExplorePostsContainer.tsx";
import FiskeAPI from "../../api.ts";
import Post from "./Post.tsx";

function UserFeedContainer(): ReactNode {
    const {user} = useUser();
    const currentUserId = user!.id;
    const [posts, setPosts] = useState([])
    console.log(posts)



  useEffect(() => {
     async function getPosts() {
      const token = localStorage.getItem('fiske-token');
      if (token) {
        try {
          const posts = await FiskeAPI.getFeed(currentUserId, token );
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
            {posts.length>0 ? posts.map(p=><Post key={p!.id} post={p}/>): ""}
        </div>
    );
}

export default UserFeedContainer;