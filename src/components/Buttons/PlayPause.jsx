import React from 'react';
import * as styles from './Buttons.scss';
export default function PlayPause({ isPlaying, handlePlayPause }) {
    return (
        <button
            onClick={handlePlayPause}
            className={styles.play}
            data-icon="P"
            aria-label="play pause toggle"
        >
            {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
    );
}
