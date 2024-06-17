import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import Group from "./Group.tsx";
import Post from "../posts/Post.tsx";
import FiskeAPI from "../../api.ts";

function GroupContainer(): ReactNode {
    const {user} = useUser();
    const [group, setGroup] = useState(null)
    const [posts, setPosts] = useState([])
    const { id } = useParams();

    useEffect(() => {
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const posts = await FiskeAPI.getGroupPosts( token, id);
             const group = await FiskeAPI.getGroup(token, id);
             setGroup(group)
             setPosts(posts)
           } catch (err) {
           } finally {
           }
         }
       };

       getPosts();
     }, []);
     console.log(group, 'HEHE');
     console.log(posts, 'HEHE')



    return (
        <div>
           {group ? <Group group={group}/>:""}
           {posts.length>0 ? posts.map(p=><Post key={p!.id} post={p}/>): ""}
        </div>
    );
}

export default GroupContainer;