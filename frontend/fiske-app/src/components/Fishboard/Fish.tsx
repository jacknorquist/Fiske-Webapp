import React from "react";
import { ReactNode , useState} from "react";
import { Link } from "react-router-dom";
import styles from './css/Fish.module.css';
import FiskeAPI from "../../api.ts";
import { FishType } from "../../types.ts";
import { useEffect } from "react";
import { useMessage } from "../../context/MessageContext.tsx";

type FishboardTypeProp = 'GroupFishboard' | 'UserFishboard';

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
 * -userName (string): fish creator's username. only displayed if Groupfishboard
 *
 * GroupContainer & ProfileContainer -> Fisboard -> Fish
 */
function Fish({fish, fishBoardType}: {fish:FishType , fishBoardType:FishboardTypeProp}): ReactNode {

    const [username, setUsername] = useState<string | null>(null);
    const {setMessage} = useMessage();

    useEffect(()=>{
        //get username for fish
        async function getUsername(){
        if(fishBoardType === 'GroupFishboard'){
            try{
            const user = await FiskeAPI.getUser(localStorage['fiske-token'], fish.user_id );
            setUsername(user.user.username)
        }catch(err:unknown){
            if (err instanceof Error) {
                setMessage(err.message, 'error');
              }else{
                setMessage('An Unknown Error Occurred', 'error')
              }
            }
        }
    }
        getUsername()
    },[])


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