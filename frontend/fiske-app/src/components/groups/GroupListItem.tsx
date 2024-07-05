import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import styles from './css/GroupListItem.module.css'

function GroupListItem({group}): ReactNode {

    const {user} = useUser()

    const[isButtonsOpen, setIsButtonsOpen] = useState(false)
    function toggleButtons(e){
        e.preventDefault();
        setIsButtonsOpen(!isButtonsOpen)
    }


    return (
        <NavLink to={`/groups/${group.id}`} className={styles.link}>
          <div className={styles.container}>
            <h2 className={styles.name}>{group.name}</h2>
            {isButtonsOpen && (
              <div className={styles.buttonscontainer}>
                {group!.admin_id === user.id ? (
                  <span className={`${styles.icon} bi bi-trash icon`}></span>
                ) : (
                  ""
                )}
              </div>
            )}
            <h5 className={styles.area}>{group.area}</h5>
            <i className={styles.fishSpecies}>{group.fish_species}</i>
            <span
              onClick={toggleButtons}
              className={`${styles.openButtonsIcon} bi bi-three-dots-vertical`}
            ></span>
          </div>
        </NavLink>
      );
}

export default GroupListItem;