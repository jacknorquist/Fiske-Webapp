import React from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import FiskeAPI from "../../api.ts";
import GroupListItem from "./GroupListItem.tsx";
import styles from './css/GroupsContainer.module.css'
import SearchGroupsContainer from "./SearchGroupsContainer.tsx";
import { v4 as uuidv4 } from 'uuid';
import { useMessage } from "../../context/MessageContext.tsx";
import { GroupType, UserType } from "../../types.ts";


/**GroupsContainer: renders GroupListItems for groups
 *
 *Props:
 * * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 *
 *State:
 * - userGroups ([{group}]): array of groups that the user has joined
 * - exploreGroups ([{group}]): array of of all groups in db
 * - exploreGroupsContainerOpen (boolean): if true, exploreGroups are rendered. Else, userGroups are rendered
 *
 * RoutesList -> GroupsContainer -> SearchGroupsContainer
 */
function GroupsContainer(): ReactNode {
    const {user}:{user: UserType} = useUser()
    const [userGroups, setUserGroups] =useState<GroupType[]>([])
    const [exploreGroups, setExploreGroups] = useState<GroupType[]>([])
    const [exploreGroupsContainerOpen, setExploreGroupsContainer] = useState<boolean>(false)
    const currentUserId:number = user.id;
    const {setMessage} = useMessage()


    //set exploreGroupsOpen true to show exploreGroups
    function openExploreGroups(){
        if (exploreGroupsContainerOpen) return
        setExploreGroupsContainer(true)
    }
    //set exploreGroupsOpen false to show userGroups
    function openUserGroups(){
        if (!exploreGroupsContainerOpen) return
        setExploreGroupsContainer(false)
    }

    useEffect(() => {
      //get userGroups and exploreGroups
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const userGroups = await FiskeAPI.getUserGroups(token, currentUserId ) ;
             const exploreGroups = await FiskeAPI.getExploreGroups(token);
             setUserGroups(userGroups)
             setExploreGroups(exploreGroups)
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
     }, []);


    return (
      <div>
        <div className={styles.nav}>
                <div className={styles.buttons}>
                    <div className={styles.buttonBox} onClick={openUserGroups}>
                        <p className={!exploreGroupsContainerOpen ? `${styles.activeButton} ${styles.button}`:styles.button} style={{margin:'1rem'}} >My Groups</p>
                    </div>
                    <div className={styles.buttonBox} onClick={openExploreGroups}>
                        <p className={exploreGroupsContainerOpen ? styles.button : `${styles.activeButton} ${styles.button}`} style={{margin:'1rem'}}>Explore</p>
                    </div>
                </div>
            </div>
        <div className={styles.container}>
            <div className={styles.searchGroupsContainer}>
              <SearchGroupsContainer />
            </div >
            <div className={styles.groupsContainer}>
            {exploreGroupsContainerOpen? exploreGroups!.map(g=><GroupListItem key={uuidv4()} group={g}/>):""}
            {!exploreGroupsContainerOpen && userGroups.length <=0 ? <p>You haven't joined any groups yet.</p>:"" }
            {!exploreGroupsContainerOpen && userGroups.length > 0 ? userGroups!.map(g=><GroupListItem key={uuidv4()} group={g}/>):"" }
            </div>
        </div>
      </div>
    );
}

export default GroupsContainer;