import React from 'react';
import Claps from 'assets/Claps.svg';
import * as styles from './Buttons.scss';

export default function Like({ handleLike }) {
    return (
        <button onClick={handleLike} className={styles.like}>
            <Claps className={styles.clap} />
        </button>
    );
}
