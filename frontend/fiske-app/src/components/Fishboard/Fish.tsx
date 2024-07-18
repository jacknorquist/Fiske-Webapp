import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import styles from './css/Fish.module.css';
import FiskeAPI from "../../api.ts";
function Fish({fish, fishBoardType}): ReactNode {

    const [username, setUsername] = useState(false)

    if(fishBoardType === 'GroupFishboard'){
        async function getUsername(){
        const user = await FiskeAPI.getUser(localStorage['fiske-token'], fish.user_id );
        setUsername(user.user.username)
        }
        getUsername()
    }



    return (
        <div className={styles.container}>
            <img className={styles.img} src={fish.image_url} />
            <div className={styles.fishStats}>
            {username ? <Link className={styles.username}to={`/profile/${fish.user_id}`}>{username}</Link>:""}
                <h6>{fish.species}</h6>
                <i>{fish.length} inches long</i>
            </div>
        </div>
    );
}

export default Fish;