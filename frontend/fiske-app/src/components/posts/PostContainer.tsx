import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import Group from "./Group.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import { Button } from "reactstrap";

function PostContainer(): ReactNode {
    const {user} = useUser();
    const [post, setPost] = useState(null)
    const {id } = useParams();
    const currentUserId = user!.id
    const [userMember, setUserMember] = useState(false)

    // useEffect(() => {
    //     async function getPosts() {
    //      const token = localStorage.getItem('fiske-token');
    //      if (token) {
    //        try {
    //          const post = await FiskeAPI.getGroupPosts( token, id);
    //          const group = await FiskeAPI.getGroup(token, id);
    //          const userGroups = await FiskeAPI.getUserGroups(token, currentUserId )

    //          setUserMember(userGroups.find(g=> g.id == id) ? true : false)
    //          setGroup(group)
    //          setPosts(posts)
    //        } catch (err) {
    //        } finally {
    //        }
    //      }
    //    };

    //    getPosts();
    //  }, []);


//      async function leaveGroup(){
//         await FiskeAPI.leaveGroup(localStorage.getItem('fiske-token'), id);
//         setUserMember(false)
//      }
//      async function joinGroup(){
//       await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), id);
//       setUserMember(true)
//    }




    return (
        <div>
            <h1>Post Container</h1>
        </div>
    );
}

export default PostContainer;