import React from 'react';
import * as styles from './Buttons.scss';
import Circle from 'assets/Circle.png';

export default function Forward({ handleForward }) {
    return (
        <img
            onClick={handleForward}
            className={styles.fwd}
            src={Circle}
            alt="Logo"
        />
    );
}
