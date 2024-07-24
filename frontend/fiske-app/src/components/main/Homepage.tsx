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

function Homepage(): ReactNode {

    const [typeOfPosts, setTypeOfPosts] = useState('userFeed');
    const [posts, setPosts] = useState([])
    const {user} = useUser();
    const {setMessage} = useMessage()






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
    }

    function setPostsToUserFeed(){
        setTypeOfPosts('userFeed')
    }

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