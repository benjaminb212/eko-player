import React from 'react';
import Social from './Social';
import Controls from './Controls';
import firebase from 'services/firebase';
import * as styles from './containers.scss';

export default function Player() {
    // isVisibilityActive flag is used to show/hide controls
    const [isVisibilityActive, setIsVisibilityActive] = React.useState(true);
    const [isWaiting, setIsWaiting] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isForward, setIsForward] = React.useState(false);
    const [isRewind, setIsRewind] = React.useState(false);
    const [timeline, setTimeline] = React.useState({
        currentTime: null,
        duration: null,
    });
    const player = React.useRef();
    const intervalFwd = React.useRef();
    const intervalRwd = React.useRef();

    React.useEffect(() => {
        // The ref value 'player.current' will likely have changed by the time this effect cleanup function runs.
        const playerElement = player.current;
        // Loading video metadata
        playerElement.addEventListener('loadedmetadata', handleLoadedMetaData);
        // Handling time elapsed
        playerElement.addEventListener('timeupdate', handleTimeUpdate);
        // Reset the video when ended
        playerElement.addEventListener('ended', handleStop);
        // Mark the video as viewed when ended
        playerElement.addEventListener('ended', handleMarkAsViewed);
        // Handling lack of data
        playerElement.addEventListener('waiting', handleWaiting);
        // Hide player controls 3 sec after the video starts
        playerElement.addEventListener('play', handlePlay);
        // Show player controls if client mouse in video element range
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            playerElement.removeEventListener(
                'loadedmetadata',
                handleLoadedMetaData
            );
            playerElement.removeEventListener('timeupdate', handleTimeUpdate);
            playerElement.removeEventListener('ended', handleStop);
            playerElement.removeEventListener('ended', handleMarkAsViewed);
            playerElement.removeEventListener('waiting', handleWaiting);
            playerElement.removeEventListener('play', handlePlay);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [
        player,
        handleLoadedMetaData,
        handleStop,
        handleTimeUpdate,
        handleMarkAsViewed,
        handleWaiting,
        handlePlay,
        handleMouseMove,
    ]);

    const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
        // Check if client's mouse is in viedo element range
        if (
            player.current.clientWidth - clientX > 0 &&
            player.current.clientHeight - clientY > 0
        ) {
            setIsVisibilityActive(true);
        } else {
            setIsVisibilityActive(false);
        }
    }, []);

    const handleWaiting = React.useCallback(() => {
        setIsWaiting(true);
    }, []);

    const handlePlay = React.useCallback(() => {
        function hideControls() {
            setIsVisibilityActive(false);
        }

        // Hide player controls 3 sec after the video starts
        setTimeout(hideControls, 3000);
    }, []);

    // Handling current video timer & duration properties
    const handleLoadedMetaData = React.useCallback(() => {
        setTimeline({
            currentTime: player.current.currentTime,
            duration: player.current.duration,
        });
        setIsWaiting(false);
    }, [player]);

    // A video considered as viewed if a user has ended the video to its end
    const handleMarkAsViewed = React.useCallback(() => {
        const viewsRef = firebase.database().ref();
        firebase
            .database()
            .ref('views')
            .once('value')
            .then((snapshot) => {
                viewsRef.update({ views: snapshot.val() + 1 });
            });

        // Handling the cleanup of subscribed getViews handler in firebase.
        return () => {
            viewsRef();
        };
    }, []);

    const handleTimeUpdate = React.useCallback(() => {
        setTimeline({ ...timeline, currentTime: player.current.currentTime });
    }, [timeline, player]);

    const handleStop = React.useCallback(() => {
        if (isRewind) {
            handleRewind();
        }

        if (isForward) {
            handleForward();
        }
        player.current.pause();
        player.current.currentTime = 0;
        setIsPlaying(false);
    }, [player, isRewind, handleRewind, isForward, handleForward]);

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
            setIsPlaying(false);
        } else if (isForward) {
            handleForward();
        } else if (isRewind) {
            handleRewind();
        } else {
            player.current.play();
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
        setIsPlaying(false);
        if (isForward) {
            clearInterval(intervalFwd.current);
            setIsForward(false);
        }
        if (isRewind) {
            clearInterval(intervalRwd.current);
            setIsRewind(false);
        } else {
            setIsRewind(true);
            player.current.pause();
            setIsPlaying(false);
            intervalRwd.current = setInterval(rewind, 200);
        }
    }, [isRewind, rewind, isForward]);

    const handleForward = React.useCallback(() => {
        setIsPlaying(false);
        if (isRewind) {
            clearInterval(intervalRwd.current);
            setIsRewind(false);
        }
        if (isForward) {
            clearInterval(intervalFwd.current);
            setIsForward(false);
        } else {
            setIsForward(true);
            player.current.pause();
            setIsPlaying(false);
            intervalFwd.current = setInterval(forward, 200);
        }
    }, [isForward, forward, isRewind]);

    if (isWaiting) return <div className={styles.player}>Loading...</div>;

    return (
        <div className={styles.player}>
            <Social isVisibilityActive={isVisibilityActive} />
            <video preload="metadata" ref={player} className={styles.video}>
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

            {isVisibilityActive ? (
                <Controls
                    isPlayback={isPlaying || isForward || isRewind}
                    timeline={timeline}
                    onStop={handleStop}
                    onPlayPause={handlePlayPause}
                    onForward={handleForward}
                    onChangeTimeline={handleChangeTimeline}
                    onRewind={handleRewind}
                />
            ) : null}
        </div>
    );
}
