import React from 'react';
import * as styles from './Timeline.scss';

export default function Timeline({currentTime}) {
    return (
        <div className={styles.timeline}>
            <div></div>
            <span className="currentTime">{currentTime}</span>
        </div>
    );
}
