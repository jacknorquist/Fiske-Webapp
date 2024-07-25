import React from "react";
import { ReactNode, useState } from "react";
import { useUser } from "../../context/UserContext.tsx";
import styles from './css/PostsContainer.module.css';
import FiskeAPI from "../../api.ts";
import { useEffect } from "react";
import PostListItem from "./PostListItem.tsx";
import { useMessage } from "../../context/MessageContext.tsx";

//TODO: I don't think this is being used
/**PostsContainer: homepage for logged in user that renders posts and SearchGroupsContainer
 *
 *Props:
 * - none
 *
 *State:
 * - typeOfPosts (string): determines the type of posts to fetch
 *
 * App -> RoutesList -> Homepage -> PostListItem & SearchGroupsContainer
 */
function PostsContainer({ typeOfPosts }): React.ReactElement {
    const { user } = useUser();
    const {setMessage} = useMessage()
    const [posts, setPosts] = useState([]);
    const [apiCall, setApiCall] = useState('');

    useEffect(() => {
        function determineApiCall() {
            if (typeOfPosts === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts === 'explore') {
                return 'getExplorePosts';
            } else if (typeOfPosts === 'group') {
                return 'getGroupPosts';
            }
        }
        async function fetchPosts() {
            const token = localStorage.getItem('fiske-token');
            if (token) {
                try {
                    const selectedApiCall = determineApiCall();
                    console.log(typeOfPosts,selectedApiCall)
                    if(selectedApiCall === "getGroupPosts"){
                        const fetchedPosts = await FiskeAPI[selectedApiCall](token, typeOfPosts.groupId.id);
                        setPosts(fetchedPosts);
                    }else{
                    const fetchedPosts = await FiskeAPI[selectedApiCall](user.user.id, token);
                    setPosts(fetchedPosts);
                    }
                } catch (err) {
                    setMessage('An error occurred', 'error')
                }
            }
        }

         // Update apiCall state initially

        fetchPosts();
    }, [typeOfPosts]);
     // Depend on typeOfPosts to trigger effect when it changes

    function updatePosts() {
        function determineApiCall() {
            if (typeOfPosts === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts === 'explore') {
                return 'getExplorePosts';
            } else if (typeOfPosts === 'group') {
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
                    const fetchedPosts = await FiskeAPI[selectedApiCall](user.user.id, token);
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