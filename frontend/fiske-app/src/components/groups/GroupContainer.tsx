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
import { PostType, GroupTypeWithFishboard, UserType, GroupType} from "../../types.ts";


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

  const {user}:{user:UserType | null} = useUser();
  const {setMessage} = useMessage();
  const navigate = useNavigate()
  const [group, setGroup] = useState<GroupTypeWithFishboard | null>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const {id} = useParams();
  const currentUserId:number = user!.id
  const [userMember, setUserMember] = useState<boolean>(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState<boolean>(false);



  useEffect(() => {
    //get posts for group
      async function getPosts() {
        const token:string | null = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const posts:PostType[] = await FiskeAPI.getGroupPosts( token, id);
            const group: GroupTypeWithFishboard = await FiskeAPI.getGroup(token, id);
            const userGroups: GroupType[] =
            await FiskeAPI.getUserGroups(
                                         token,
                                         currentUserId )
            setUserMember(userGroups.find(g=> g.id === Number(id)) ? true : false)
            setGroup(group)
            setPosts(posts)
          }catch(err:unknown){
            if (err instanceof Error) {
                setMessage(err.message, 'error');
              }else{
                setMessage('An Unknown Error Occurred', 'error')
              }
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
    }catch(err:unknown){
      if (err instanceof Error) {
          setMessage(err.message, 'error');
        }else{
          setMessage('An Unknown Error Occurred', 'error')
        }
  }
    }

  //user leave group
  async function joinGroup(){
    try{
    await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), id);
    setUserMember(true)
  }catch(err:unknown){
    if (err instanceof Error) {
        setMessage(err.message, 'error');
      }else{
        setMessage('An Unknown Error Occurred', 'error')
      }
    }
  }

  //delete group
  async function deleteGroup(){
    if(group){
    try{
        await FiskeAPI.deleteGroup( localStorage['fiske-token'], group.group.id);
        navigate('/')
      }catch(err:unknown){
        if (err instanceof Error) {
            setMessage(err.message, 'error');
          }else{
            setMessage('An Unknown Error Occurred', 'error')
          }
    }
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


    return (
      <div className={styles.container}>
           {isEditGroupOpen && group ?
           <EditGroupContainer
           group={group}
           toggleEditGroup={toggleEditGroup}
           updateGroup={updateGroup}
           />
           : ""}
        <div className={styles.leftContainer}>
           {group && user ?
            <div className={styles.header}>
                <img
                  src={group!.group!.header_image_url ||
                  `${process.env.PUBLIC_URL}/DefaultHeader.jpg`}
                  className={styles.headerImage} alt="" />
                <div className={styles.content}>
                  <div style={{display:'flex', alignContent:'center'}}>
                    <h3>{group?.group.name}</h3>
                    {group.group!.admin_id === user.id ?
                    <i
                    className={`${styles.icon} bi bi-trash`}
                    onClick={deleteGroup}>
                    </i>
                    :""}
                    {user!.id === group.group!.admin_id ?
                    <i
                    className={`${styles.icon} bi bi-pen`}
                    onClick={toggleEditGroup}>
                    </i>
                    :""}
                    {userMember ?
                    <Button
                      style={{right:'0'}}
                      className={styles.leaveButton}
                      onClick={leaveGroup}>
                      Leave
                    </Button>
                    :
                    <Button
                      className={styles.joinButton}
                      style={{right:'0'}}
                      onClick={joinGroup}>
                      Join
                    </Button>}
                  </div>
                  <div style={{display:'flex'}}>
                    <p
                    style={{margin:'0'}}>
                    <b>Area: </b>
                    {group.group!.area}
                    </p>
                  </div>
                  <div style={{display:'flex'}}>
                    <p
                    style={{margin:'0'}}>
                    <b>Target Species: </b>
                    {group.group!.fish_species}
                    </p>
                  </div>
                  <p style={{margin:'0'}}>{group.group!.description}</p>
                  {(userMember  || group?.group?.admin_id === user.id)&& !isCreatePostOpen
                    ?
                    <div
                    className={styles.createPostButton}
                    onClick={toggleCreatePost}>
                    Make a Post
                    </div>
                  :""}
                </div>
                {isCreatePostOpen
                  &&
                <CreatePostContainer
                groupId={id}
                toggleCreatePost={toggleCreatePost}
                updatePosts={updatePosts}/>}
            </div>
           :""}
           <div className={styles.fishboardContainer}>
            {group ?
              <FishboardContainer
              fishboard={group.fishboard}
              fishBoardType={'GroupFishboard'}
              profileIsUser={false}/>
            :""}
           </div>
           <div className={styles.postContainer}>
           {posts.length>0 ?
              posts.map(p=>
              <PostListItem
              key={p!.id}
              post={p}
              updatePosts={updatePosts}/>)
              :
              <p>No Posts Yet..</p>}
           </div>
        </div>
      </div>
    );
}

export default GroupContainer;
