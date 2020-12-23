import React from 'react';
import * as styles from './Buttons.scss';
export default function Forward({ handleForward }) {
    return (
        <button
            onClick={handleForward}
            className={styles.fwd}
            data-icon="F"
            aria-label="fast forward"
        >
            FWD
        </button>
    );
}
