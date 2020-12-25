import React, { useEffect } from 'react';
import Claps from 'assets/Claps.svg';
import firebase from 'services/firebase';
import * as styles from './Buttons.scss';

export default function Like({ handleLike }) {
    return (
        <button onClick={handleLike} className={styles.like}>
            <Claps />
        </button>
    );
}
