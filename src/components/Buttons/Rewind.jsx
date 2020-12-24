import React from 'react';
import Circle from 'assets/Circle.png';
import * as styles from './Buttons.scss';

export default function Rewind({ handleRewind }) {
    return (
        <img
            onClick={handleRewind}
            className={styles.rwd}
            src={Circle}
            alt="Logo"
        />
    );
}
