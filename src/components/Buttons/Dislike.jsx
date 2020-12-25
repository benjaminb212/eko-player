import React from 'react';
import Unlike from 'assets/Unlike.svg';
import * as styles from './Buttons.scss';

export default function Dislike({ handleDislike }) {
    return (
        <button onClick={handleDislike} className={styles.dislike}>
            <Unlike className={styles.boo} />
        </button>
    );
}
