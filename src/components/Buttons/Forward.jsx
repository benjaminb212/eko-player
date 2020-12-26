import React from 'react';
import ForwardIcon from 'assets/forward.svg';
import * as styles from './Buttons.scss';

export default function Forward({ handleForward }) {
    return <ForwardIcon onClick={handleForward} className={styles.fwd} />;
}
