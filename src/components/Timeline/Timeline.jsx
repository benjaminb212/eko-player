import React from 'react';
import * as styles from './Timeline.scss';

export default function Timeline(props) {
    return (
        <div className={styles.timeline}>
            <div></div>
            <span className="currentTime">00:00</span>
        </div>
    );
}
