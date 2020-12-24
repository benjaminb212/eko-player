import React, { useEffect } from 'react';
import Social from './Social';
import Controls from './Controls';
import * as styles from './containers.scss';

export default function Player() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isForward, setIsForward] = React.useState(false);
    const [isRewind, setIsRewind] = React.useState(false);
    const [timeline, setTimeline] = React.useState({currentTime: 0, duration: null});
    const player = React.useRef();
    const intervalFwd = React.useRef();
    const intervalRwd = React.useRef();

    useEffect(() => {
        function onLoad() {
            player.current.addEventListener('timeupdate', handleTimeUpdate);
            player.current.addEventListener('ended', handleStop);
            console.log(player.current.duration)
            setTimeline({
                currentTime: player.current.currentTime,
                duration: player.current.duration,
            });
        }

        onLoad();
    }, [handlePlayPause, handleStop, handleTimeUpdate]);

    const handleTimeUpdate = React.useCallback(() => {
        const minutes = Math.floor(player.current.currentTime / 60);
        const seconds = Math.floor(player.current.currentTime - minutes * 60);
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

        // let mediaTime = minuteValue + ':' + secondValue;
        // timer.textContent = mediaTime;

        // let barLength =
        //     timerWrapper.clientWidth * (player.current.currentTime / player.current.duration);
        // timerBar.style.width = barLength + 'px';
    });

    const handleStop = React.useCallback(() => {
        player.current.pause();
        player.current.currentTime = 0;
        setIsPlaying(false);
    }, [setIsPlaying]);

    const rewind = React.useCallback(() => {
        if (player.current.currentTime <= 3) {
            setIsRewind(false);
            clearInterval(intervalRwd.current);
            handleStop();
        } else {
            player.current.currentTime -= 3;
        }
    }, [handleStop]);

    const forward = React.useCallback(() => {
        if (player.current.currentTime >= player.current.duration - 3) {
            setIsForward(false);
            clearInterval(intervalFwd.current);
            handleStop();
        } else {
            player.current.currentTime += 3;
        }
    }, [handleStop]);

    const handlePlayPause = React.useCallback(() => {

        if (isForward) {
            handleForward();
            return;
        }

        if (isRewind) {
            handleRewind();
            return;
        }

        if (isPlaying) {
            player.current.pause();
        } else {
            player.current.play();
        }

        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handleChangeTimeline = React.useCallback(
        (seconds) => {
            return () => {
                const currentTime = player.current.currentTime;
                player.current.seek(currentTime + seconds);
            };
        },
        [player]
    );

    const handleRewind = React.useCallback(() => {
        clearInterval(intervalFwd.current);
        setIsForward(false);
        if (isRewind) {
            setIsRewind(false);
            clearInterval(intervalRwd.current);
            setIsPlaying(true);
            player.current.play();
        } else {
            setIsRewind(true);
            setIsPlaying(false);
            player.current.pause();
            intervalRwd.current = setInterval(rewind, 200);
        }
    }, [isRewind, rewind]);

    const handleForward = React.useCallback(() => {
        clearInterval(intervalRwd.current);
        setIsRewind(false);
        if (isForward) {
            setIsForward(false);
            clearInterval(intervalFwd.current);
            setIsPlaying(true);
            player.current.play();
        } else {
            setIsForward(true);
            setIsPlaying(false);
            player.current.pause();
            intervalFwd.current = setInterval(forward, 200);
        }
    }, [isForward, forward]);

    return (
        <div className={styles.player}>
            <Social />
            <video ref={player} className={styles.video}>
                {/*Safari / iOS, IE9*/}
                <source
                    src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
                    type="video/mp4"
                />
                {/*Chrome10+, Ffx4+, Opera10.6+*/}
                <source
                    src="http://clips.vorwaerts-gmbh.de/VfE.webm"
                    type="video/webm"
                />
                {/*Firefox3.6+ / Opera 10.5+*/}
                <source
                    src="http://clips.vorwaerts-gmbh.de/VfE.ogv"
                    type="video/ogg"
                />
            </video>
            <Controls
                isPlaying={isPlaying}
                currentTime={timeline.currentTime}
                duration={timeline.duration}
                onStop={handleStop}
                onPlayPause={handlePlayPause}
                onForward={handleForward}
                onChangeTimeline={handleChangeTimeline}
                onRewind={handleRewind}
            />
        </div>
    );
}
