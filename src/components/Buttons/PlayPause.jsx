import React from 'react';
import * as styles from './Buttons.scss';
import PlayIcon from 'assets/Play.svg';
import PauseIcon from 'assets/Pause.svg';

export default function PlayPause({ isPlayback, handlePlayPause }) {
    return isPlayback ? (
        <PauseIcon onClick={handlePlayPause} className={styles.playPause} />
    ) : (
        <PlayIcon onClick={handlePlayPause} className={styles.playPause} />
    );
}
