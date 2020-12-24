import React from 'react';
import Square from 'assets/Square.png'
import * as styles from './Buttons.scss';

export default function Stop({ handleStop }) {
    return (
        <img
        onClick={handleStop}
        className={styles.stop}
        src={Square}
        alt="Logo"
    />
    );
}
