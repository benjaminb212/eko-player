import React from 'react';
import * as styles from './Timeline.scss';

export default function Timeline({ currentTime, duration }) {
    const [length, setLength] = React.useState(0);
    const durationRef = React.useRef();

    React.useEffect(() => {
        const length =
            durationRef.current.clientWidth * (currentTime / duration);

        setLength(length);
    }, [currentTime, duration]);

    console.log(currentTime);

    return (
        <div className={styles.timeline}>
            <div
                ref={durationRef}
                className={styles.duration}
                style={{ width: length + 'px' }}
            ></div>
            <span className={styles.currentTime}>{currentTime}</span>
        </div>
    );
}
