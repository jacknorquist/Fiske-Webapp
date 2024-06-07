import React from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

function Homepage(): ReactNode {
    return (
        <div>
            <h1>Home</h1>
            <Link to='profile'>Profile</Link>
        </div>
    );
}

export default Homepage;