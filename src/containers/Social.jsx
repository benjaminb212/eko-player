import React from 'react';
import { Views, Votes } from '../components';
import * as styles from './containers.scss';

export default function Social() {
    return (
        <div className={styles.social}>
            <Views />
            <Votes />
        </div>
    );
}
