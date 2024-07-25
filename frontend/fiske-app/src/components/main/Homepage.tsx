import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import GroupsContainer from "../groups/GroupsContainer.tsx";
import PostsContainer from "../posts/PostsContainer.tsx";
import Post from "./Post.tsx";
import { useState } from "react";
import { Button } from "reactstrap";
import styles from './css/Homepage.module.css';
import FiskeAPI from "../../api.ts";
import { useEffect } from "react";
import PostListItem from "../posts/PostListItem.tsx";
import { useUser } from "../../context/UserContext.tsx";
import SearchGroupsContainer from "../groups/SearchGroupsContainer.tsx";
import { useMessage } from "../../context/MessageContext.tsx";


/**Homepage: homepage for logged in user that renders posts and SearchGroupsContainer
 *
 *Props:
 * - none
 *
 *State:
 * - typeOfPosts (string): determines the type of posts to fetch
 *
 * App -> RoutesList -> Homepage -> PostListItem & SearchGroupsContainer
 */
function Homepage(): ReactNode {
    const [typeOfPosts, setTypeOfPosts] = useState('userFeed');
    const [posts, setPosts] = useState([])
    const {user} = useUser();
    const {setMessage} = useMessage()

    useEffect(() => {
        //determine type of posts to fetch
        function determineApiCall() {
            if (typeOfPosts === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts === 'explore') {
                return 'getExplorePosts';
            } else if (typeOfPosts === 'group') {
                return 'getGroupPosts';
            }
        }
        //fetch posts
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
                    setMessage('An error occurred', 'error')
                }
            }
        }

         // Update apiCall state initially

        fetchPosts();
    }, [typeOfPosts]);

    //updatePosts
    function updatePosts() {
        //determine type of posts to fetch
        function determineApiCall() {
            if (typeOfPosts === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts === 'explore') {
                return 'getExplorePosts';
            } else if (typeOfPosts === 'group') {
                return 'getGroupPosts';
            }
        }
        //fetch posts
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
                    setMessage('An error occurred', 'error')
                }
            }
        }
        fetchPosts();
    }

    //set posts type to 'userFeed'
    function setPostsToUserFeed(){
        setTypeOfPosts('userFeed')
    }

    //setposts tyoe to 'explore
    function setPostsToExplore(){
        setTypeOfPosts('explore')
    }
    return (
        <div>
            <div className={styles.nav}>
                    <div className={styles.buttons}>
                        <div className={styles.buttonBox} onClick={setPostsToUserFeed}>
                            <p className={typeOfPosts === 'userFeed' ? `${styles.activeButton} ${styles.button}`:styles.button} style={{margin:'1rem'}} >My Posts</p>
                        </div>
                        <div className={styles.buttonBox} onClick={setPostsToExplore}>
                            <p className={typeOfPosts === 'userFeed' ? styles.button : `${styles.activeButton} ${styles.button}`} style={{margin:'1rem'}}>Explore</p>
                        </div>
                    </div>
                </div>
            <div className={styles.container}>
                <div className={styles.searchGroupsContainer}>
                    <SearchGroupsContainer />
                </div>
                <div className={styles.postContainer}>
                {posts.length>0 ? posts.map(p=><PostListItem key={p!.id} post={p} updatePosts={updatePosts}/>): <p>Hmm. no posts yet. Join a group to get started!</p>}
                </div>
            </div>
        </div>
    );
}

export default Homepage;