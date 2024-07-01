import React from "react";
import { ReactNode } from "react";
import styles from './css/FishBoardContainer.module.css';

function Fishboard(): ReactNode {
    return (
        <div className={styles.container}>
            <h1>Fishboard</h1>
            <h2>Comming Soon!</h2>
        </div>
    );
}

export default Fishboard;