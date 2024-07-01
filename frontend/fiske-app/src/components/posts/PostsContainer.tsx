import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExplorePostsContainer from "./ExplorePostsContainer.tsx";
import UserPostsContainer from "./UserPostsContainer.tsx";
import { Button } from "reactstrap";
import styles from './css/PostsContainer.module.css'

function PostsContainer(): ReactNode {
    const {user} = useUser()
    const [explorePostsContainerOpen, setExplorePostsContainer] = useState(false)

    function openExplorePosts(){
        if (explorePostsContainerOpen) return
        setExplorePostsContainer(true)
    }

    function openUserPosts(){
        if (!explorePostsContainerOpen) return
        setExplorePostsContainer(false)
    }


    return (
        <div className={styles.container}>
            <Button onClick={openUserPosts} >My Posts</Button>
            <Button onClick={openExplorePosts}>Explore</Button>
            {explorePostsContainerOpen? <ExplorePostsContainer />:<UserPostsContainer />}
        </div>
    );
}

export default PostsContainer;