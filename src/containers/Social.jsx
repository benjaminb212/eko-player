import React from 'react';
import { Views, Votes } from '../components';
import * as styles from './containers.scss';

export default function Social({ isVisibilityActive }) {
    return (
        <div className={styles.social}>
            <Views isVisibilityActive={isVisibilityActive} />
            <Votes isVisibilityActive={isVisibilityActive} />
        </div>
    );
}
