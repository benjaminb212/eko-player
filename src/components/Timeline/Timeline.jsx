import React from 'react';
import * as styles from './Timeline.scss';

export default function Timeline({ currentTime, duration }) {
    const [progress, setProgress] = React.useState({});
    const timelineRef = React.useRef();
    const durationRef = React.useRef();

    React.useEffect(() => {
        // Using ref to get the duration when video is loaded
        if (typeof duration === 'number') durationRef.current = duration;

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime - minutes * 60);

        let minuteValue;
        let secondValue;

        if (minutes < 10) {
            minuteValue = '0' + minutes;
        } else {
            minuteValue = minutes;
        }

        if (seconds < 10) {
            secondValue = '0' + seconds;
        } else {
            secondValue = seconds;
        }

        const time = minuteValue + ':' + secondValue;

        // Set progress element width to the realational portion of its wrapper
        const length =
            timelineRef.current.clientWidth *
            (currentTime / durationRef.current);

        setProgress({ time: time, width: length });
    }, [currentTime, duration]);

    return (
        <div className={styles.timeline} ref={timelineRef}>
            <div
                className={styles.progress}
                style={{ width: progress.width + 'px' }}
            />
            <span className={styles.currentTime}>{progress.time}</span>
        </div>
    );
}
