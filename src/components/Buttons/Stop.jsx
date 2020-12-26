import React from 'react';
import StopIcon from 'assets/stop.svg';
import * as styles from './Buttons.scss';

export default function Stop({ handleStop }) {
    return <StopIcon onClick={handleStop} className={styles.stop} />;
}
