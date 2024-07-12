import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Fish from "./Fish.tsx";
import FishboardFormContainer from "./FishboardFormContainer.tsx";
import style from './css/FishBoardContainer.module.css'

function FishboardContainer({fishboard, fishBoardType, profileIsUser}): ReactNode {
    const[isCreateFishOpen, setIsCreateFishOpen] = useState(false);

    function toggleCreateFish(){
        setIsCreateFishOpen(!isCreateFishOpen);
    }


    

    return (
        <div className={style.container}>
            <h1>Fishboard</h1>
            <div className={style.fishContainer}>
            {fishboard.fish.map(f => <Fish fish={f}/>)}
            </div>
            {isCreateFishOpen ?
            <FishboardFormContainer fishboard={fishboard} fishBoardType={fishBoardType} toggleCreateFish={toggleCreateFish}/>
            :""}
            {(profileIsUser && fishBoardType==='UserFishboard') || fishBoardType==='GroupFishBoard' ? <p onClick={toggleCreateFish}>Add a Fish</p>:""}

        </div>
    );
}

export default FishboardContainer;