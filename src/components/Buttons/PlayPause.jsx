import React from 'react';
import * as styles from './Buttons.scss';
import Triangle from 'assets/Triangle.png';
import X from 'assets/X.png';

export default function PlayPause({ isPlaying, handlePlayPause }) {
    return (
        <img
            onClick={handlePlayPause}
            className={!isPlaying && styles.play}
            src={isPlaying ? X : Triangle}
            alt="Logo"
        />
    );
}
