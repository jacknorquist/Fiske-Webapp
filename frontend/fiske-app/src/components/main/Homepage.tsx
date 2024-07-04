import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import GroupsContainer from "../groups/GroupsContainer.tsx";
import PostsContainer from "../posts/PostsContainer.tsx";
import Post from "./Post.tsx";
import { useState } from "react";
import { Button } from "reactstrap";

function Homepage(): ReactNode {

    const [typeOfPosts, setTypeOfPosts] = useState({type:'userFeed'})

    function setPostsToUserFeed(){
        setTypeOfPosts({type:'userFeed'})
    }

    function setPostsToExplore(){
        setTypeOfPosts({type:'explore'})
    }
    return (
        <div>
            <h1>Home</h1>
            <Button onClick={setPostsToUserFeed} >My Posts</Button>
            <Button onClick={setPostsToExplore}>Explore</Button>
            <PostsContainer typeOfPosts={typeOfPosts} />
        </div>
    );
}

export default Homepage;