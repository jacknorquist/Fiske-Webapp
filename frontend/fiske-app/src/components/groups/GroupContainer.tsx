import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import Group from "./Group.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import { Button } from "reactstrap";
import PostListItem from "../posts/PostListItem.tsx";

function GroupContainer(): ReactNode {
    const {user} = useUser();
    const [group, setGroup] = useState(null)
    const [posts, setPosts] = useState([])
    const {id} = useParams();
    const currentUserId = user!.id
    const [userMember, setUserMember] = useState(false)

    useEffect(() => {
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const posts = await FiskeAPI.getGroupPosts( token, id);
             const group = await FiskeAPI.getGroup(token, id);
             const userGroups = await FiskeAPI.getUserGroups(token, currentUserId )

             setUserMember(userGroups.find(g=> g.id == id) ? true : false)
             setGroup(group)
             setPosts(posts)
           } catch (err) {
           } finally {
           }
         }
       };

       getPosts();
     }, []);


     async function leaveGroup(){
        await FiskeAPI.leaveGroup(localStorage.getItem('fiske-token'), id);
        setUserMember(false)
     }
     async function joinGroup(){
      await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), id);
      setUserMember(true)
   }




    return (
        <div>
           {group ? <Group group={group}/>:""}
           {userMember ? <Button onClick={leaveGroup}>Leave</Button>:<Button onClick={joinGroup}>Join</Button>}
           {posts.length>0 ? posts.map(p=><PostListItem key={p!.id} post={p}/>): ""}
        </div>
    );
}

export default GroupContainer;