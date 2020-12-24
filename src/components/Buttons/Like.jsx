import React from 'react';
import Heart from 'assets/Heart.svg';
import * as styles from './Buttons.scss';

export default function Like({ handleLike }) {
    return (
        <button onClick={handleLike} className={styles.like}>
            <Heart />
        </button>
    );
}
