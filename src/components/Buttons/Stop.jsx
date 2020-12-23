import React from 'react';
import * as styles from './Buttons.scss';
export default function Stop({ handleStop }) {
    return (
        <button
            onClick={handleStop}
            className={styles.stop}
            data-icon="S"
            aria-label="stop"
        >
            STOP
        </button>
    );
}
