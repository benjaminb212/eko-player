import React from 'react';
import { Timeline, Forward, Rewind, PlayPause } from '../components';
import * as styles from './containers.scss';

export default function Controls({
    isPlaying,
    onPlayPause,
    onForward,
    onChangeTimeline,
    onRewind,
}) {
    //Get the time from db
    return (
        <div className={styles.controls}>
            <PlayPause isPlaying={isPlaying} handlePlayPause={onPlayPause} />
            <Timeline handleChangeTimeline={onChangeTimeline} />
            <Forward handleForward={onForward} />
            <Rewind handleRewind={onRewind} />
        </div>
    );
}
