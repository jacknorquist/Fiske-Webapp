import React, { useState } from "react";
import { ReactNode, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import FiskeAPI from "../../api.ts";
import PostListItem from "./PostListItem.tsx";
import { useMessage } from "../../context/MessageContext.tsx";


//TODO: I dont think this is being used

function UserFeedContainer(): ReactNode {
    const {user} = useUser();
    const {setMessage} = useMessage();
    const currentUserId = user.id;
    const [posts, setPosts] = useState([])



  useEffect(() => {
     async function getPosts() {
      const token = localStorage.getItem('fiske-token');
      if (token) {
        try {

          const posts = await FiskeAPI.getFeed(currentUserId, token );
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
            {posts.length>0 ? posts.map(p=><PostListItem key={p!.id} post={p} updatePosts={updatePosts}/>): ""}
        </div>
    );
}

export default UserFeedContainer;