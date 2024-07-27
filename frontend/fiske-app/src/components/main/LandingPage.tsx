import React from "react";
import { ReactNode } from "react";
import { Button } from "reactstrap";
import styles from './css/LandingPage.module.css'
import { Link } from "react-router-dom";



/**LandingPage: renders signup link and login link for logged out user
 *
 *Props:
 * - none
 *
 *State:
 * - none
 *
 * App -> RoutesList -> LandingPage
 */
function LandingPage(): ReactNode {
    return (
        <div className={styles.container}>
            <div className={styles.center}>
            <img
                src={`${process.env.PUBLIC_URL}/FiskeLogo.png`}
                className={styles.fiskelogo}
                alt="logo" />
            <div className={styles.buttons}>
                <Button href="/login" className={styles.button}>Login</Button>
                <Button href="/signup" className={styles.button}>Signup</Button>
            </div>
            </div>
        </div>
    );
}

export default LandingPage;