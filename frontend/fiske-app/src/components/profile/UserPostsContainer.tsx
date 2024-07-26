import React from "react";
import { ReactNode, useEffect, useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import FiskeAPI from "../../api.ts";
import PostListItem from "../posts/PostListItem.tsx";
import { v4 as uuidv4 } from 'uuid';
import { useMessage } from "../../context/MessageContext.tsx";

/**UserPostsContainerr: renders PostListItems for posts that the user has created
 *
 *Props:
  * - profileUser (obj): object containing data of the user thats profile is being viewed like...
 *    {
 *      user:
 *          {
 *           header_image_url:'link.com',
 *           profile_image_url:'link.com',
 *           first_name:'bob',
 *           last_name:'jerry',
 *           bio:'I like to fish',
 *           username: 'walleyeguy',
 *           fishboardboard_points:5,
 *           id: 5
 *           }
 *    fishboard:{
 *            fish:[fish(obj), fish(obj)],
 *            id: 2,
 *                }
 *    }
 *
 *State:
 * - userPosts (array): array containing objects of posts that the user has created
 *
 * RoutesList -> ProfileContainer -> UserPostsContainer -> PostListItem
 */
function UserPostsContainer({profileUser}): ReactNode {



  const [userPosts,  setUserPosts] = useState([])
  const {user} = useUser();
  const {setMessage}= useMessage()


    useEffect(() => {
      //get posts that user has created
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const posts = await FiskeAPI.getUserPosts(profileUser.user.id, token );
             setUserPosts(posts)
           } catch (err) {
            setMessage('An error occured', 'error')
           } finally {
           }
         }
       };

       getPosts();
     }, [profileUser]);


    //update posts
    function updatePosts(){
      async function getPosts() {
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const posts = await FiskeAPI.getUserPosts(profileUser.user.id, token );
            setUserPosts(posts)
          } catch (err) {
            setMessage('An error occured', 'error')
          } finally {
          }
        }
      };

      getPosts();
    }

    return (
        <div>
            {userPosts.length>0? userPosts.map(p=> <PostListItem key={uuidv4()} post={p} updatePosts={updatePosts}/>): <p>No posts yet..</p>}
        </div>
    );
}

export default UserPostsContainer;