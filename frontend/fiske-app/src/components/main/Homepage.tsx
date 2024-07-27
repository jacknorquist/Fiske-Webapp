import React from "react";
import { ReactNode } from "react";
import { useState } from "react";
import styles from './css/Homepage.module.css';
import FiskeAPI from "../../api.ts";
import { useEffect } from "react";
import PostListItem from "../posts/PostListItem.tsx";
import { useUser } from "../../context/UserContext.tsx";
import SearchGroupsContainer from "../groups/SearchGroupsContainer.tsx";
import { useMessage } from "../../context/MessageContext.tsx";
import { PostType, UserType } from "../../types.ts";

//TODO refactor determineApiCall
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
    const [typeOfPosts, setTypeOfPosts] = useState<string>('userFeed');
    const [posts, setPosts] = useState<PostType[]>([]);
    const {user}:{user:UserType | null} = useUser();
    const {setMessage} = useMessage()

    useEffect(() => {
        //determine type of posts to fetch
        function determineApiCall() {
            if (typeOfPosts === 'userFeed') {
                return 'getFeed';
            } else if (typeOfPosts === 'explore') {
                return 'getExplorePosts';
            }
        }
        //fetch posts
        async function fetchPosts() {
            const token:string | null = localStorage.getItem('fiske-token');
            const selectedApiCall = determineApiCall();
            if (token && selectedApiCall && user) {
                try {
                    const fetchedPosts:PostType[] =
                    await FiskeAPI[selectedApiCall](
                                                    user.id,
                                                    token
                                                    );
                    setPosts(fetchedPosts);
                }catch(err:unknown){
                    if (err instanceof Error) {
                        setMessage(err.message, 'error');
                      }else{
                        setMessage('An Unknown Error Occurred', 'error')
                      }
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
            }
        }
        //fetch posts
        async function fetchPosts() {
            const token = localStorage.getItem('fiske-token');
            const selectedApiCall = determineApiCall();
            if (token && selectedApiCall && user) {
                try {
                    const fetchedPosts =
                    await FiskeAPI[selectedApiCall](
                                                    user.id,
                                                    token
                                                    );
                    setPosts(fetchedPosts);
                }catch(err:unknown){
                    if (err instanceof Error) {
                        setMessage(err.message, 'error');
                      }else{
                        setMessage('An Unknown Error Occurred', 'error')
                      }
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
                        <div className={styles.buttonBox}
                             onClick={setPostsToUserFeed}>
                            <p
                              className={typeOfPosts === 'userFeed' ?
                                       `${styles.activeButton} ${styles.button}`
                                       :
                                       styles.button}
                            style={{margin:'1rem'}}>
                            My Posts
                            </p>
                        </div>
                        <div className={styles.buttonBox}
                             onClick={setPostsToExplore}>
                            <p
                              className={typeOfPosts === 'userFeed' ?
                                         styles.button
                                         :
                                         `${styles.activeButton} ${styles.button}`}
                              style={{margin:'1rem'}}>
                                Explore
                            </p>
                        </div>
                    </div>
                </div>
            <div className={styles.container}>
                <div className={styles.searchGroupsContainer}>
                    <SearchGroupsContainer />
                </div>
                <div className={styles.postContainer}>
                {posts.length>0 ?
                    posts.map(p=><PostListItem
                                  key={p!.id}
                                  post={p}
                                  updatePosts={updatePosts}/>)
                :
                <p>Hmm. no posts yet. Join a group to get started!</p>
                }
                </div>
            </div>
        </div>
    );
}

export default Homepage;