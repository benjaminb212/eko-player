import React from 'react';
import { Timeline, Stop, Forward, Rewind, PlayPause } from '../components';
import * as styles from './containers.scss';

export default function Controls({
    isPlaying,
    onPlayPause,
    onForward,
    onChangeTimeline,
    onRewind,
    onStop
}) {
    //Get the time from db
    return (
        <div className={styles.controls}>
            <PlayPause isPlaying={isPlaying} handlePlayPause={onPlayPause} />
            <Stop  handleStop={onStop} />
            <Timeline handleChangeTimeline={onChangeTimeline} />
            <Forward handleForward={onForward} />
            <Rewind handleRewind={onRewind} />
        </div>
    );
}
