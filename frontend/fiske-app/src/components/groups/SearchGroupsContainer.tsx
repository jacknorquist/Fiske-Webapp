import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { useEffect } from "react";
import FiskeAPI from "../../api.ts";
import GroupListItem from "./GroupListItem.tsx";
import SearchGroupsForm from "./SearchGroupsForm.tsx";
import styles from './css/SearchGroupsContainer.module.css'
import { v4 as uuidv4 } from 'uuid';

function SearchGroupsContainer(): ReactNode {

    const {user} = useUser()
    const [groups, setGroups] = useState([])

    const[isButtonsOpen, setIsButtonsOpen] = useState(false)
    function toggleButtons(e){
        e.preventDefault();
        setIsButtonsOpen(!isButtonsOpen)
    }

    useEffect(() => {
        async function getGroups() {
         const token = localStorage.getItem('fiske-token');
         if (token) {
           try {
             const groups = await FiskeAPI.getExploreGroups(token);
             setGroups(groups)
           } catch (err) {
           } finally {
           }
         }
       };

       getGroups();
     }, []);

     async function updateGroups(formData){
        const token = localStorage.getItem('fiske-token');
        if (token) {
          try {
            const groups = await FiskeAPI.searchGroups(token, formData);
            console.log(groups, 'groups at search')
            setGroups(groups)
          } catch (err) {
          } finally {
          }
        }
     }



    return (

        <div>
          <div className={styles.sticky}>
            <h6>Find Groups</h6>
            <SearchGroupsForm updateGroups={updateGroups}/>
          </div>
            {groups.length>0 ? groups.map(g=> <GroupListItem key={uuidv4()} group={g}/>):<p>No Groups Found</p>}
        </div>

      );
}

export default SearchGroupsContainer;