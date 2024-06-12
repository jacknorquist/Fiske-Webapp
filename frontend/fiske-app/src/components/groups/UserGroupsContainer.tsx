import React from "react";
import { ReactNode } from "react";
import { useUser } from "../../context/UserContext.tsx";

function Fishboard(): ReactNode {
    const {user} = useUser()

    

    return (
        <div>
            <h1>Fishboard</h1>
        </div>
    );
}

export default Fishboard;