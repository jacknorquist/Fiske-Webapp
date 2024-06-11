import React from "react";
import { ReactNode, useEffect, useState } from "react";
import styles from '../../css/profile/UserPostsContainer.module.css'
import FiskeAPI from "../../api.ts";
import { useUser } from "../../context/UserContext.tsx";
import { useError } from "../../context/ErrorContext.tsx";
import UserPost from "./UserPost.tsx";
function UserPostsContainer(): ReactNode {
    const {user} = useUser();
    const [userPosts, setUserPosts] = useState(null)
    const {setError} = useError();
    const currentUserId = user!.id
    useEffect(() => {
        const getPosts = async () => {
        const token = localStorage.getItem('fiske-token');
        if (token) {
            try {
                const posts = await FiskeAPI.getUserPosts(currentUserId, token);
                if (posts.length > 0) setUserPosts(posts)
            } catch (err) {
                setError(err.message)
            }
        }
        };

    getPosts();
    }, []);



    return (
        <div className={styles.container}>
        {userPosts ? (
        userPosts.map(post => <UserPost key={post.id} name={post.name} />)
      ) : (
        <p>No posts found</p>
      )}
        </div>
    );
}

export default UserPostsContainer;