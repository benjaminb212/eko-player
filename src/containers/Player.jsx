import React, { useEffect } from 'react';
import Social from './Social';
import Controls from './Controls';
import firebase from 'services/firebase';
import * as styles from './containers.scss';

export default function Player() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isForward, setIsForward] = React.useState(false);
    const [isRewind, setIsRewind] = React.useState(false);
    const [timeline, setTimeline] = React.useState({
        currentTime: '00:00',
        duration: 0,
    });
    const player = React.useRef();
    const intervalFwd = React.useRef();
    const intervalRwd = React.useRef();

    useEffect(() => {
        function onLoad() {
            // Handling time elapsed
            player.current.addEventListener('timeupdate', handleTimeUpdate);
            // Reset the video if ended
            player.current.addEventListener('ended', handleStop);
            player.current.addEventListener('ended', handleViewed);
            console.log('player.current.duration: ', player.current.duration);
            console.log(
                'player.current.currentTime: ',
                player.current.currentTime
            );
            setTimeline({
                currentTime: player.current.currentTime,
                duration: player.current.duration,
            });
        }

        onLoad();
    }, [handleStop, handleTimeUpdate]);

    // A video considered as viewed if a user has ended the video to its end
    const handleViewed = React.useCallback(() => {
        const viewsRef = firebase.database().ref();
        firebase
            .database()
            .ref('views')
            .once('value')
            .then((snapshot) => {
                console.log('WOW:', snapshot.val());
                viewsRef.update({ views: snapshot.val() + 1 });
            });
    }, []);

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

        let time = minuteValue + ':' + secondValue;

        setTimeline({ currentTimr: time });
    }, [player]);

    const handleStop = React.useCallback(() => {
        player.current.pause();
        player.current.currentTime = 0;
        setIsPlaying(false);
        setIsRewind(false);
        setIsForward(false);
        clearInterval(intervalRwd);
        clearInterval(intervalFwd);
    }, [player]);

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
        if (isPlaying) {
            player.current.pause();
        } else {
            if (isForward) {
                handleForward();
            } else if (isRewind) {
                handleRewind();
            } else {
                player.current.play();
            }
        }

        setIsPlaying(!isPlaying);
    }, [isPlaying, handleForward, isForward, handleRewind, isRewind]);

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
            clearInterval(intervalRwd.current);
            setIsRewind(false);
            player.current.play();
            setIsPlaying(true);
        } else {
            setIsRewind(true);
            player.current.pause();
            setIsPlaying(false);
            intervalRwd.current = setInterval(rewind, 200);
        }
    }, [isRewind, rewind]);

    const handleForward = React.useCallback(() => {
        clearInterval(intervalRwd.current);
        setIsRewind(false);
        if (isForward) {
            clearInterval(intervalFwd.current);
            setIsForward(false);
            player.current.play();
            setIsPlaying(true);
        } else {
            setIsForward(true);
            player.current.pause();
            setIsPlaying(false);
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
                timeline={timeline}
                onStop={handleStop}
                onPlayPause={handlePlayPause}
                onForward={handleForward}
                onChangeTimeline={handleChangeTimeline}
                onRewind={handleRewind}
            />
        </div>
    );
}
