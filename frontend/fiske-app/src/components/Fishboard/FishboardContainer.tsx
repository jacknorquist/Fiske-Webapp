import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Fish from "./Fish.tsx";
import FishboardFormContainer from "./FishboardFormContainer.tsx";

function FishboardContainer({fishboard, fishBoardType}): ReactNode {
    const[isCreateFishOpen, setIsCreateFishOpen] = useState(false);

    function toggleCreateFish(){
        setIsCreateFishOpen(!isCreateFishOpen)
    }

    return (
        <div>
            {fishboard.fish.map(f => <Fish fish={f}/>)}
            {isCreateFishOpen ?
            <FishboardFormContainer fishboard={fishboard} fishBoardType={fishBoardType} toggleCreateFish={toggleCreateFish}/>
            :""}
            <button onClick={toggleCreateFish}>Add Fish</button>

        </div>
    );
}

export default FishboardContainer;