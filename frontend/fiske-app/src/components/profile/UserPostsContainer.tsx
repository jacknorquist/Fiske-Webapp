import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import PostListItem from "../posts/PostListItem.tsx";
import styles from './css/UserPostsContainer.module.css';

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
     }, [userPosts]);

    function updatePosts(){
      setUserPosts([])
    }

    return (
        <div className={styles.container}>
          <h1 >User Posts</h1>
            {userPosts.length>0? userPosts.map(p=> <PostListItem post={p} updatePosts={updatePosts}/>): ""}
        </div>
    );
}

export default UserPostsContainer;