import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Fish from "./Fish.tsx";
import FishboardFormContainer from "./FishboardFormContainer.tsx";
import style from './css/FishBoardContainer.module.css'
import { v4 as uuidv4 } from 'uuid';

function FishboardContainer({fishboard, fishBoardType, profileIsUser}): ReactNode {
    const[isCreateFishOpen, setIsCreateFishOpen] = useState(false);
    const[isExpanded, setIsExpanded] = useState(false);

    function toggleCreateFish(){
        setIsCreateFishOpen(!isCreateFishOpen);
    }

    function toggleIsExpanded(){
        setIsExpanded(!isExpanded)
    }




    return (
        <div className={style.container}>
            <div onClick={toggleIsExpanded}className={style.header}>
                <h5 >Fishboard</h5>
                {isExpanded ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>}
            </div>
            {isExpanded ?
            <div>
            <div className={style.fishContainer}>
            {fishboard?.fish.length > 0?  fishboard?.fish.map(f => <Fish key={uuidv4()} fishBoardType={fishBoardType}fish={f}/>): <p style={{marginLeft:'.5rem'}}>No Fish Yet...</p>}
            </div>
            {((profileIsUser && fishBoardType==='UserFishboard') || fishBoardType==='GroupFishboard') && !isCreateFishOpen
            ? <button className={style.addAFish} onClick={toggleCreateFish}>Add A Fish</button>
            :""}
            {isCreateFishOpen ?
            <FishboardFormContainer fishboard={fishboard} fishBoardType={fishBoardType} toggleCreateFish={toggleCreateFish}/>
            :""}
            </div>
            :""}


        </div>
    );
}

export default FishboardContainer;