import React from 'react';
import Eye from 'assets/Eye.png';
import * as styles from './Views.scss';

export default function Views({counter}) {
    return (
        <div className={styles.views}>
            <img className={styles.eye} src={Eye} alt="Eye" />
            <span className={styles.counter}>{counter}0</span>
        </div>
    );
}
