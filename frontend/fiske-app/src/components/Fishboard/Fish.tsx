import React from "react";
import { ReactNode , useState} from "react";
import { useUser } from "../../context/UserContext.tsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function Fish({fish}): ReactNode {
    console.log(fish.image_url, 'fishhhhh')

    return (
        <div>
            <img src={fish.image_url} />
        </div>
    );
}

export default Fish;