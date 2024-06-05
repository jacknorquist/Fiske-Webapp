import React from "react";
import { ReactNode } from "react";
import { Button } from "reactstrap";
import styles from '../css/LandingPage.module.css'

function LandingPage(): ReactNode {
    return (
        <div className={styles.container}>
            <img src={`${process.env.PUBLIC_URL}/FiskeLogo.png`} className="App-logo" alt="logo" />
            {/* <Button href="/login">Login</Button>
            <Button href="/signup">Signup</Button> */}
        </div>
    );
}

export default LandingPage;