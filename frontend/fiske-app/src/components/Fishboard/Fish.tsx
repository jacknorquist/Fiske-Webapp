import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import styles from './css/Fish.module.css';
import FiskeAPI from "../../api.ts";

//TODO: Send username with fish in backend. Eliminate additional call at line 30.

/**Fish: Renders individual fish.
 *
 *Props:
 * - fish (obj): object containing individual fish data like...
 *  {fish_image_url:'walleye.com', fish_user_id:2, fish_species:'Walleye', fish_length:10}
 * - fishboardType (string): string that is either GroupFishboard or UserFishboard.
 *   GroupFishboard adds the username to the fish, UserFishboard does not.
 *
 *State:
 * -none
 *
 * Fisboard -> Fish
 */
function Fish({fish, fishBoardType}): ReactNode {

    let username = null;

    if(fishBoardType === 'GroupFishboard'){
        async function getUsername(){
        const user = await FiskeAPI.getUser(localStorage['fiske-token'], fish.user_id );
        username = (user.user.username)
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