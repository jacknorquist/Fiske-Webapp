import React from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExploreGroupsContainer from "./ExploreGroupsContainer.tsx";
import UserGroupsContainer from "./UserGroupsContainer.tsx";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import FiskeAPI from "../../api.ts";
import Group from "./Group.tsx";
import GroupListItem from "./GroupListItem.tsx";
import styles from './css/GroupsContainer.module.css'
import SearchGroupsContainer from "./SearchGroupsContainer.tsx";
import { v4 as uuidv4 } from 'uuid';
import { useMessage } from "../../context/MessageContext.tsx";


/**GroupsContainer: renders GroupListItem's for groups
 *
 *Props:
 * * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 *
 *State:
 * - userIsMember (boolean): if true, user is a member of the group
 * - isButtonsOpen (boolean): if true, utility box is displayed
 */
function GroupsContainer(): ReactNode {
    const {user} = useUser()
    const [userGroups, setUserGroups] =useState([])
    const [exploreGroups, setExploreGroups] = useState([])
    const [exploreGroupsContainerOpen, setExploreGroupsContainer] = useState(false)
    const currentUserId = user.id;
    const {setMessage} = useMessage()

    function openExploreGroups(){
        if (exploreGroupsContainerOpen) return
        setExploreGroupsContainer(true)
    }

    function openUserGroups(){
        if (!exploreGroupsContainerOpen) return
        setExploreGroupsContainer(false)
    }

    useEffect(() => {
        async function getPosts() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const userGroups = await FiskeAPI.getUserGroups(token, currentUserId ) ;
             const exploreGroups = await FiskeAPI.getExploreGroups(token);
             setUserGroups(userGroups)
             setExploreGroups(exploreGroups)
           } catch (err) {
            setMessage('An Error Occurred', 'error')

           } finally {
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