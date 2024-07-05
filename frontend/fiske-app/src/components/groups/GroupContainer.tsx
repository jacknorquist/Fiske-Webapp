import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import Group from "./Group.tsx";
import Post from "../posts/PostContainer.tsx";
import FiskeAPI from "../../api.ts";
import { Button } from "reactstrap";
import PostListItem from "../posts/PostListItem.tsx";
import CreatePostContainer from "../posts/CreatePostContainer.tsx";
import styles from './css/GroupContainer.module.css';
import { useError } from "../../context/ErrorContext.tsx";
import { useNavigate } from "react-router-dom";
import PostsContainer from "../posts/PostsContainer.tsx";
import EditGroupContainer from "./EditGroupContainer.tsx";

//consider making forms that are open a state at the app level?
function GroupContainer(): ReactNode {
    const {user} = useUser();
    const{groupId} = useParams()
    const {setError} = useError();
    const navigate = useNavigate()
    const [group, setGroup] = useState({})
    const [posts, setPosts] = useState([])
    const {id} = useParams();
    const currentUserId = user!.id
    const [userMember, setUserMember] = useState(false)
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);




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
     }, [userMember]);


     async function leaveGroup(){
        await FiskeAPI.leaveGroup(localStorage.getItem('fiske-token'), id);
        setUserMember(false)
     }
     async function joinGroup(){
      await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), id);
      setUserMember(true)
   }

   function toggleCreatePost (){
    setIsCreatePostOpen(!isCreatePostOpen)
  }

  function toggleEditGroup(){
    setIsEditGroupOpen(!isEditGroupOpen)
  }


  function updatePosts(){
    setUserMember(!userMember)
  }

  function updateGroup(){
    setUserMember(!userMember)
  }


  async function deleteGroup(){
    try{
        await FiskeAPI.deleteGroup( localStorage['fiske-token'], group.id);
        navigate('/')
       }catch (err){
         setError(err.message)
       }
}



    return (
      <div>
           {isCreatePostOpen && <CreatePostContainer group={id} toggleCreatePost={toggleCreatePost} updatePosts={updatePosts}/>}
           {isEditGroupOpen && <EditGroupContainer  toggleEditGroup={toggleEditGroup} groupId={groupId} updateGroup={updateGroup}/>}
        <div className={`${styles.container} ${isCreatePostOpen ? styles.overlay : ''}`}>
           {group ?
           <div className={styles.header}>
            <img src={group!.header_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} className={styles.headerImage} alt="" />
            <p>{group!.area}</p>
            <p>{group!.fish_species}</p>
           {userMember ? <Button onClick={toggleCreatePost}>+</Button>:""}
           {userMember ? <Button onClick={leaveGroup}>Leave</Button>:<Button onClick={joinGroup}>Join</Button>}
           {user!.id === group!.admin_id ? <Button onClick={toggleEditGroup}>Edit</Button>:""}
           {group!.admin_id === user.id ? <Button onClick={deleteGroup}>Delete Group</Button>:""}
           </div>:""}
           <div className={styles.postContainer}>
           {posts.length>0 ? posts.map(p=><PostListItem key={p!.id} post={p} updatePosts={updatePosts}/>): ""}
           </div>
        </div>
      </div>
    );
}

export default GroupContainer;