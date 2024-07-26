import React from "react";
import { ReactNode , useState} from "react";
import Fish from "./Fish.tsx";
import FishboardFormContainer from "./FishboardFormContainer.tsx";
import style from './css/FishBoardContainer.module.css'
import { v4 as uuidv4 } from 'uuid';
import FiskeAPI from "../../api.ts";
import { useMessage } from "../../context/MessageContext.tsx";
import { FishboardContainerPropsType, FishboardType } from "../../types.ts";








/**FishBoard Container: Renders all Fish in a fishboard and FishboardFormContainer.
 *
 *Props:
 * - fishboard(obj): object containing fishboard data like...
 *    {fish:[fish(obj), fish(obj), fish(obj)]}
 * - fishboardType (string): string that is either GroupFishboard or UserFishboard.
 * - profileIsUser (boolean): used to determine if user can add to UserFishBord type
 *
 *State:
 * - isExpanded(boolean): if true FishboardContainer expands to show fish and add a
 *    FishboardFormContainer button
 * - fishboardState (obj): object containing fishboard data like...
 *    {fish:[fish(obj), fish(obj), fish(obj)]} used to provide fishboard info.
 * - isCreateFishOpen (boolean): if true, FishboardFormContainer is visible
 *
 * Fisboard -> Fish & FishboardFormContainer
 */

function FishboardContainer({
                             fishboard,
                             fishBoardType,
                             profileIsUser
                            }:FishboardContainerPropsType): ReactNode {

    const[isCreateFishOpen, setIsCreateFishOpen] = useState<boolean>(false);
    const[fishboardState, setFishboardState] = useState<FishboardType>(fishboard)
    const[isExpanded, setIsExpanded] = useState<boolean>(false);
    const {setMessage} = useMessage();

    //toggle isCreateFishOpen to display FishboardFormContainer
    function toggleCreateFish(){
        setIsCreateFishOpen(!isCreateFishOpen);
    }

    //toggle isExpanded to display Fishboaard contents
    function toggleIsExpanded(){
        setIsExpanded(!isExpanded);
    }

    //update fishboardState
    async function updateFishboard(){
        if(fishBoardType === 'UserFishboard'){
            try{
                const boardResponse: FishboardType =
                await FiskeAPI.getUserFishboard(
                                                localStorage['fiske-token'],
                                                fishboardState.id);
                setFishboardState(boardResponse)
            }catch(err:unknown){
                if (err instanceof Error) {
                    setMessage(err.message, 'error');
                  }else{
                    setMessage('An Unknown Error Occurred', 'error')
                  }
            }
        }else{
            try{
                const boardResponse: FishboardType =
                await FiskeAPI.getGroupFishboard(
                                                 localStorage['fiske-token'],
                                                 fishboardState.id);
                setFishboardState(boardResponse)
            }catch(err:unknown){
                if (err instanceof Error) {
                    setMessage(err.message, 'error');
                  }else{
                    setMessage('An Unknown Error Occurred', 'error')
                  }
            }

        }
    }
    return (
        <div className={style.container}>
            <div onClick={toggleIsExpanded}className={style.header}>
                <h5 >Fishboard</h5>
                {isExpanded ?
                <i className="bi bi-arrow-up"></i>
                :
                <i className="bi bi-arrow-down"></i>}
            </div>
            {isExpanded ?
                <div>
                    <div className={style.fishContainer}>
                    {fishboardState?.fish.length > 0?
                    fishboardState?.fish.map(f => <Fish
                                                   key={uuidv4()}
                                                   fishBoardType={fishBoardType}
                                                   fish={f}/>)
                    :
                    <p style={{marginLeft:'.5rem'}}>No Fish Yet...</p>}
                    </div>
                {((profileIsUser && fishBoardType==='UserFishboard')|| fishBoardType==='GroupFishboard')
                    && !isCreateFishOpen
                    ?
                    <div className={style.addAFishButton} onClick={toggleCreateFish}>Add A Fish</div>
                :""}
                {isCreateFishOpen ?
                    <FishboardFormContainer fishboard={fishboardState} fishBoardType={fishBoardType}
                     toggleCreateFish={toggleCreateFish} updateFishboard={updateFishboard}/>
                :""}
                </div>
            :""}
        </div>
    );
}

export default FishboardContainer;