import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExplorePostsContainer from "./ExplorePostsContainer.tsx";
import UserPostsContainer from "./UserPostsContainer.tsx";
import { Button } from "reactstrap";
import styles from './css/PostsContainer.module.css';
import FiskeAPI from "../../api.ts";
import { useEffect } from "react";
import PostListItem from "./PostListItem.tsx";

function PostsContainer({ typeOfPosts }): React.ReactElement {
    const { user } = useUser();
    const [posts, setPosts] = useState([]);
    const [apiCall, setApiCall] = useState('');

    useEffect(() => {
        function determineApiCall() {
            if (typeOfPosts.type === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts.type === 'explore') {
                return 'getExplorePosts';
            } else if (typeOfPosts.type === 'group') {
                return 'getGroupPosts';
            }
        }
        async function fetchPosts() {
            const token = localStorage.getItem('fiske-token');
            if (token) {
                try {
                    const selectedApiCall = determineApiCall();
                    if(selectedApiCall === "getGroupPosts"){
                        const fetchedPosts = await FiskeAPI[selectedApiCall](token, typeOfPosts.groupId.id);
                        setPosts(fetchedPosts);
                    }else{
                    const fetchedPosts = await FiskeAPI[selectedApiCall](user.id, token);
                    setPosts(fetchedPosts);
                    }
                } catch (err) {
                    console.error('Error fetching posts:', err.message);
                }
            }
        }

         // Update apiCall state initially

        fetchPosts();
    }, [typeOfPosts]);
     // Depend on typeOfPosts to trigger effect when it changes

    function updatePosts() {
        function determineApiCall() {
            if (typeOfPosts.type === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts.type === 'explore') {
                return 'getExplorePosts';
            } else if (typeOfPosts.type === 'group') {
                return 'getGroupPosts';
            }
        }
        async function fetchPosts() {
            const token = localStorage.getItem('fiske-token');
            if (token) {
                try {
                    const selectedApiCall = determineApiCall();
                    if(selectedApiCall === "getGroupPosts"){
                        const fetchedPosts = await FiskeAPI[selectedApiCall](token, typeOfPosts.groupId.id);
                        setPosts(fetchedPosts);
                    }else{
                    const fetchedPosts = await FiskeAPI[selectedApiCall](user.id, token);
                    setPosts(fetchedPosts);
                    }
                } catch (err) {
                    console.error('Error fetching posts:', err.message);
                }
            }
        }

         // Update apiCall state initially

        fetchPosts();
    }

    return (
        <div className={styles.container}>
            {posts.length > 0 ? (
                posts.map((p) => <PostListItem key={p.id} post={p} updatePosts={updatePosts} />)
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
}

export default PostsContainer;