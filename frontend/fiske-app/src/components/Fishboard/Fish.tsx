import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import style from './css/Fish.module.css'
function Fish({fish}): ReactNode {
    console.log(fish.image_url, 'fishhhhh')

    return (
        <div className={style.container}>
            <img className={style.img} src={fish.image_url} />
            <p>{fish.species}</p>
            <i>{fish.length}in.</i>
        </div>
    );
}

export default Fish;