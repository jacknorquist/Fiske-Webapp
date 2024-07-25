import React from "react";
import { ReactNode, useState, useEffect} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import FiskeAPI from "../../api.ts";
import { Button } from "reactstrap";
import PostListItem from "../posts/PostListItem.tsx";
import CreatePostContainer from "../posts/CreatePostContainer.tsx";
import styles from './css/GroupContainer.module.css';
import { useMessage } from "../../context/MessageContext.tsx";
import { useNavigate } from "react-router-dom";
import EditGroupContainer from "./EditGroupContainer.tsx";
import FishboardContainer from "../Fishboard/FishboardContainer.tsx";

//TODO: change useEffect to listen to groupState (updateposts and updategroup)

/**GroupContainer: renders group
 *
 *Props:
 * - none
 *
 *State:
 * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 * - posts (array): contains array of indivudal posts like...
 *    [{content:'', user_id:2, comments:[{},{}]}]
 * - userIsMember (boolean): if true, user is a member of the group
 * - isCreatePostOpen (boolean): if true, CreatePostContainer is visible
 * - isEditGroupOpen (boolean): if true, EditGroupContainer is visible
 */
function GroupContainer(): ReactNode {

  const {user} = useUser();
  const {setMessage} = useMessage();
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [posts, setPosts] = useState([])
  const {id} = useParams();
  const currentUserId = user!.id
  const [userMember, setUserMember] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);



  useEffect(() => {
    //get posts for group
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

  //user join group
  async function leaveGroup(){
    try{
      await FiskeAPI.leaveGroup(localStorage.getItem('fiske-token'), id);
      setUserMember(false);
    }catch(err){
      setMessage('Failed to Leave Group', 'error')
    }
    }
  //user leave group
  async function joinGroup(){
    try{
    await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), id);
    setUserMember(true)
    }catch(err){
      setMessage('Failed to Join Group', 'error')
    }
  }
  //toggle isCreatePostOpen to show CreatePostContainer
  function toggleCreatePost (){
    setIsCreatePostOpen(!isCreatePostOpen)
  }
  //toggle isEditGroupOPen to show EditGroupContainer
  function toggleEditGroup(){
    setIsEditGroupOpen(!isEditGroupOpen)
  }

  //trigger useEffect to update groups posts
  function updatePosts(){
    setUserMember(!userMember)
  }

  //trigger useEffect to update groups
  function updateGroup(){
    setUserMember(!userMember)
  }

  //delete group
  async function deleteGroup(){
    try{
        await FiskeAPI.deleteGroup( localStorage['fiske-token'], group.group.id);
        navigate('/')
      }catch (err){
        setMessage(err.message, 'error')
      }
  }

    return (
      <div className={styles.container}>
           {isEditGroupOpen && <EditGroupContainer group={group} toggleEditGroup={toggleEditGroup} updateGroup={updateGroup}/>}
        <div className={styles.leftContainer}>
           {group ?
           <div className={styles.header}>
            <img src={group!.group!.header_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} className={styles.headerImage} alt="" />
            <div className={styles.content}>
            <div style={{display:'flex', alignContent:'center'}}>
            <h3>{group?.group.name}</h3>
           {group.group!.admin_id === user.id ? <i className={`${styles.icon} bi bi-trash`} onClick={deleteGroup}></i>:""}
           {user!.id === group.group!.admin_id ? <i  className={`${styles.icon} bi bi-pen`}onClick={toggleEditGroup}></i>:""}
           {userMember ? <Button style={{right:'0'}} className={styles.leaveButton} onClick={leaveGroup}>Leave</Button>:<Button className={styles.joinButton} style={{right:'0'}}  onClick={joinGroup}>Join</Button>}
            </div>
            <div style={{display:'flex'}}>
            <p style={{margin:'0'}}><b>Area: </b>{group.group!.area}</p>
            </div>
            <div style={{display:'flex'}}>
            <p style={{margin:'0'}}><b>Target Species: </b>{group.group!.fish_species}</p>
            </div>
            <p style={{margin:'0'}}>{group.group!.description}</p>
            {(userMember  || group?.group?.admin_id === user.id)&& !isCreatePostOpen  ? <div className={styles.createPostButton}onClick={toggleCreatePost}>Make a Post</div>:""}
            </div>
             {isCreatePostOpen && <CreatePostContainer group={id} toggleCreatePost={toggleCreatePost} updatePosts={updatePosts}/>}
           </div>:""}
           <div className={styles.fishboardContainer}>
            {group ?
            <FishboardContainer fishboard={group.fishboard} fishBoardType={'GroupFishboard'} profileIsUser={false}/>
            :""}
           </div>
           <div className={styles.postContainer}>
           {posts.length>0 ? posts.map(p=><PostListItem key={p!.id} post={p} updatePosts={updatePosts}/>): <p>No Posts Yet..</p>}
           </div>
        </div>
      </div>
    );
}

export default GroupContainer;
