import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styles from './css/GroupListItem.module.css'
import { useEffect } from "react";
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import { GroupType } from "../../types.ts";

//TODO: Toggle isButtonsOpen to off (window event listener?). & . Efficient way to determine if user is a member

/**GroupListItem: renders group in list format
 *
 *Props:
 * * - group (obj): holds group data like...
 *    {name:'group', fish_species:'walleye', area:'Minnesota', description:'group for walleyes', id:5, user_id:1 }
 *
 *State:
 * - userIsMember (boolean): if true, user is a member of the group
 * - isButtonsOpen (boolean): if true, utility box is displayed
 */
function GroupListItem({group}:{group:GroupType}): ReactNode {

    const {user} = useUser();
    const {setMessage} = useMessage()
    const [isUserMember, setIsUserMemeber] = useState<boolean>(false)
    const[isButtonsOpen, setIsButtonsOpen] = useState<boolean>(false)

    //toggle isButtonsOpen to show utility box with buttons
    function toggleButtons(e: React.MouseEvent){
        e.preventDefault();
        setIsButtonsOpen(!isButtonsOpen)
    }
     console.log(group, 'group')

    useEffect(() => {
      //determines if user is a member of the group
      async function getGroups() {
       const token:string | null = localStorage.getItem('fiske-token');
       if (token) {
         try {
           const groups:GroupType[] = await FiskeAPI.getUserGroups( token, user.id);
           setIsUserMemeber(groups.find(g=> g.id == group.id) ? true : false)
          }catch(err:unknown){
            if (err instanceof Error) {
                setMessage(err.message, 'error');
              }else{
                setMessage('An Unknown Error Occurred', 'error')
              }
        }
       }
     };

     getGroups();
   }, []);

   //user leave group
   async function leaveGroup(e: React.MouseEvent){
      e.preventDefault();
      try{
      await FiskeAPI.leaveGroup(localStorage.getItem('fiske-token'), group.id);
      setIsUserMemeber(false);
      }catch(err:unknown){
      if (err instanceof Error) {
          setMessage(err.message, 'error');
        }else{
          setMessage('An Unknown Error Occurred', 'error')
        }
      }

  }

  //user join group
  async function joinGroup(e: React.MouseEvent){
    e.preventDefault();

    try{
    await FiskeAPI.joinGroup(localStorage.getItem('fiske-token'), group.id);
    setIsUserMemeber(true)
    }catch(err:unknown){
    if (err instanceof Error) {
        setMessage(err.message, 'error');
      }else{
        setMessage('An Unknown Error Occurred', 'error')
      }
    }
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