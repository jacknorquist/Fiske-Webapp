import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Fish from "./Fish.tsx";
import FiskeAPI from "../../api.ts";
import FishboardForm from "./FishboardForm.tsx";
import style from './css/FishboardFormContainer.module.css'

function FishboardFormContainer({fishboard, fishBoardType, toggleCreateFish}): ReactNode {

    const {user} = useUser()

    async function createFish(formData){
        try{
            await FiskeAPI.createFish(localStorage['fiske-token'], fishboard.id, fishBoardType, user.id,  formData);
        }catch(err){

        }
    }

    return (
        <div className={style.container}>
            <FishboardForm  createFish={createFish} toggleCreateFish={toggleCreateFish}/>
        </div>
    );
}

export default FishboardFormContainer;