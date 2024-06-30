import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExplorePostsContainer from "./ExplorePostsContainer.tsx";
import UserPostsContainer from "./UserPostsContainer.tsx";
import { Button } from "reactstrap";

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
        <div>
            <Button onClick={openUserPosts} >My Posts</Button>
            <Button onClick={openExplorePosts}>Explore</Button>
            {explorePostsContainerOpen? <ExplorePostsContainer />:<UserPostsContainer />}
        </div>
    );
}

export default PostsContainer;