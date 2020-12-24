import BrokenHeart from 'assets/BrokenHeart.svg';
import React from 'react';
import * as styles from './Buttons.scss';

export default function Dislike({ handleDislike }) {
    return (
        <button
            onClick={handleDislike}
            className={styles.dislike}
        ><BrokenHeart /></button>
    );
}
