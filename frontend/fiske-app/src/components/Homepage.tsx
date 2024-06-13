import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import GroupsContainer from "./groups/GroupsContainer.tsx";
import PostsContainer from "./posts/PostsContainer.tsx";
import Post from "./Post.tsx";

function Homepage(): ReactNode {
    return (
        <div>
            <h1>Home</h1>
            <PostsContainer />
        </div>
    );
}

export default Homepage;