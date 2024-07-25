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
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";

function FishboardContainer({fishboard, fishBoardType, profileIsUser}): ReactNode {
    const[isCreateFishOpen, setIsCreateFishOpen] = useState(false);
    const[isExpanded, setIsExpanded] = useState(false);
    const {setMessage} = useMessage()
    const [fishboardState, setFishboardState] = useState(fishboard)

    function toggleCreateFish(){
        setIsCreateFishOpen(!isCreateFishOpen);
    }

    function toggleIsExpanded(){
        setIsExpanded(!isExpanded)
    }


    async function updateFishboard(){
        if(fishBoardType === 'UserFishboard'){
            try{
                const boardResponse = await FiskeAPI.getUserFishboard(localStorage['fiske-token'], fishboardState.id);
                setFishboardState(boardResponse)
            }catch(err){
                setMessage(err.message, 'error')
            }
        }else{
            try{
                const boardResponse = await FiskeAPI.getGroupFishboard(localStorage['fiske-token'], fishboardState.id);
                setFishboardState(boardResponse)
            }catch(err){
                setMessage(err.message, 'error')
            }

        }

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
            {fishboardState?.fish.length > 0?  fishboardState?.fish.map(f => <Fish key={uuidv4()} fishBoardType={fishBoardType}fish={f}/>): <p style={{marginLeft:'.5rem'}}>No Fish Yet...</p>}
            </div>
            {((profileIsUser && fishBoardType==='UserFishboard') || fishBoardType==='GroupFishboard') && !isCreateFishOpen
            ? <div className={style.addAFishButton} onClick={toggleCreateFish}>Add A Fish</div>
            :""}
            {isCreateFishOpen ?
            <FishboardFormContainer fishboard={fishboardState} fishBoardType={fishBoardType} toggleCreateFish={toggleCreateFish} updateFishboard={updateFishboard}/>
            :""}
            </div>
            :""}


        </div>
    );
}

export default FishboardContainer;