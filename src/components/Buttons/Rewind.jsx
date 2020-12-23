import React from 'react';
import * as styles from './Buttons.scss';

export default function Rewind({ handleRewind }) {
    return (
        <button
            onClick={handleRewind}
            className={styles.rwd}
            data-icon="B"
            aria-label="rewind"
        >
            RWD
        </button>
    );
}
