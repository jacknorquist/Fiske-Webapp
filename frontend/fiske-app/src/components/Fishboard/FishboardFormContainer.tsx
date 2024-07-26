import React from "react";
import { ReactNode} from "react";
import { useUser } from "../../context/UserContext.tsx";
import FiskeAPI from "../../api.ts";
import FishboardForm from "./FishboardForm.tsx";
import style from './css/FishboardFormContainer.module.css'
import { useMessage } from "../../context/MessageContext.tsx";
import {FishboardFormContainerPropsType,
         FishboardFormDataType }
         from "../../types.ts";


/**FishboardFormContainer: handles createFish functionality and renders FishboardForm
 *
 *Props:
 * - fishboard(obj): object containing fishboard data like...
 *    {fish:[fish(obj), fish(obj), fish(obj)]}
 * - fishboardType (string): string that is either GroupFishboard or UserFishboard.
 * - toggleCreateFish (function): toogles visibility of FishboardFormContainer
 * - updateFishboard (function): updates FishboardState
 *
 *State:
 * -none
 *
 * Fishboard -> FishboardFormContainer -> Fishboardform
 */
function FishboardFormContainer({
                                fishboard,
                                fishBoardType,
                                toggleCreateFish,
                                updateFishboard
                                }:FishboardFormContainerPropsType): ReactNode {

    const {user} = useUser();
    const {setMessage} = useMessage();

    //create fish
    async function createFish(formData:FishboardFormDataType){
        try{
            await FiskeAPI.createFish(
                                      localStorage['fiske-token'],
                                      fishboard.id,
                                      fishBoardType,
                                      user!.id,
                                      formData);
            updateFishboard();
        }catch(err:unknown){
            if (err instanceof Error) {
                setMessage(err.message, 'error');
              }else{
                setMessage('An Unknown Error Occurred', 'error')
              }
        }

    }

    return (
        <div className={style.container}>
            <FishboardForm
            createFish={createFish}
            toggleCreateFish={toggleCreateFish}/>
        </div>
    );
}

export default FishboardFormContainer;