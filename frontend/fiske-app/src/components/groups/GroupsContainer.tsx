import React from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.tsx";
import ExploreGroupsContainer from "./ExploreGroupsContainer.tsx";
import UserGroupsContainer from "./UserGroupsContainer.tsx";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import FiskeAPI from "../../api.ts";
import Group from "./Group.tsx";

function GroupsContainer(): ReactNode {
    const {user} = useUser()
    const [userGroups, setUserGroups] =useState([])
    const [exploreGroups, setExploreGroups] = useState([])
    const [exploreGroupsContainerOpen, setExploreGroupsContainer] = useState(false)
    const currentUserId = user!.id;

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
             const userGroups = await FiskeAPI.getUserGroups(token, currentUserId );
             const exploreGroups = await FiskeAPI.getExploreGroups(token);
             setUserGroups(userGroups)
             setExploreGroups(exploreGroups)
           } catch (err) {
           } finally {
           }
         }
       };

       getPosts();
     }, []);

     console.log(userGroups, 'ggggggggggggg')



    return (
        <div>
            <Button onClick={openUserGroups} >My Groups</Button>
            <Button onClick={openExploreGroups}>Explore</Button>
            <Link to='/groups/3'>Group3 </Link>

            if ({userGroups.length > 0}) {
            exploreGroupsContainerOpen? exploreGroups!.map(g=><Group group={g}/>):userGroups!.map(g=><Group group={g}/>)
            }

        </div>
    );
}

export default GroupsContainer;