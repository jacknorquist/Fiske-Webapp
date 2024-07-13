import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styles from './css/GroupListItem.module.css'
import { useEffect } from "react";
import FiskeAPI from "../../api.ts";

function GroupListItem({group}): ReactNode {

    const {user} = useUser();
    const [isUserMember, setIsUserMemeber] = useState(false)


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
           const groups = await FiskeAPI.getUserGroups( token, user.id);
           setIsUserMemeber(groups.find(g=> g.id == group.id) ? true : false)
         } catch (err) {
         } finally {
         }
       }
     };

     getGroups();
   }, []);


   async function leaveGroup(e){
    e.preventDefault();
    await FiskeAPI.leaveGroup(localStorage.getItem('fiske-token'), group.id);
    setIsUserMemeber(false)
 }
 async function joinGroup(e){

  e.preventDefault();
  await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), group.id);
  setIsUserMemeber(true)
}




    return (
        <NavLink to={`/groups/${group.id}`} className={styles.link}>
          <div className={styles.container}>
            <div className={styles.header}>
              <img src={group.header_image_url || `${process.env.PUBLIC_URL}/DefaultHeader.jpg`} className={styles.headerImage}alt="" />
              <h2 className={styles.name}>{group.name}</h2>
            </div>
            {isButtonsOpen && (
              <div className={styles.buttonscontainer}>
                {!isUserMember ? < i onClick={joinGroup}>Join</i> : <i onClick={leaveGroup}>Leave</i>}
              </div>
            )}
            <div className={styles.area}>
            <p><b>Area:</b>{' '}{group.area}</p>
            </div>
            <div className={styles.species}>
            <p><b>Species:</b>{' '}{group.fish_species}</p>
            </div>
            <span
              onClick={toggleButtons}
              className={`${styles.openButtonsIcon} bi bi-three-dots-vertical`}
            ></span>
          </div>
        </NavLink>
      );
}

export default GroupListItem;