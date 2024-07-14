import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import PostListItem from "../posts/PostListItem.tsx";
import styles from './css/UserPostsContainer.module.css';
import { v4 as uuidv4 } from 'uuid';


function UserPostsContainer({profileUser}): ReactNode {

    const {user} = useUser();
    const [userPosts,  setUserPosts] = useState([])
    const currentUserId = user.id

    useEffect(() => {
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const posts = await FiskeAPI.getUserPosts(profileUser.user.id, token );
             setUserPosts(posts)
           } catch (err) {
           } finally {
           }
         }
       };

       getPosts();
     }, [profileUser]);

    function updatePosts(){
      async function getPosts() {
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const posts = await FiskeAPI.getUserPosts(profileUser.user.id, token );
            setUserPosts(posts)
          } catch (err) {
          } finally {
          }
        }
      };

      getPosts();
    }

    return (
        <div>
            {userPosts.length>0? userPosts.map(p=> <PostListItem key={uuidv4()} post={p} updatePosts={updatePosts}/>): <p>No posts yet..</p>}
        </div>
    );
}

export default UserPostsContainer;