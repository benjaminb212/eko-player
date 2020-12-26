import React from 'react';
import RewindIcon from 'assets/rewind.svg';
import * as styles from './Buttons.scss';

export default function Rewind({ handleRewind }) {
    return <RewindIcon onClick={handleRewind} className={styles.rwd} />;
}
