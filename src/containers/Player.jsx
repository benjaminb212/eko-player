import React from 'react';
import Social from './Social';
import Controls from './Controls';
import firebase from 'services/firebase';
import * as styles from './containers.scss';

export default function Player() {
    const [controls, setControls] = React.useState(true);
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
        // Loading video metadata
        player.current.addEventListener('loadedmetadata', handleLoadedMetaData);
        // Handling time elapsed
        player.current.addEventListener('timeupdate', handleTimeUpdate);
        // Reset the video when ended
        player.current.addEventListener('ended', handleStop);
        // Mark the video as viewed when ended
        player.current.addEventListener('ended', handleMarkAsViewed);
        // Handling lack of data
        player.current.addEventListener('waiting', handleWaiting);
        // Hide player controls 3 sec after the video starts
        player.current.addEventListener('play', handlePlay);
        // Show player controls if client mouse in video element range
        document.addEventListener('mousemove', handleMouseMove);
    }, [
        player,
        handleLoadedMetaData,
        handleStop,
        handleTimeUpdate,
        handleMarkAsViewed,
    ]);

    const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
        // Check if client's mouse is in viedo element range
        if (
            player.current.clientWidth - clientX > 0 &&
            player.current.clientHeight - clientY > 0
        ) {
            setControls(true);
        } else {
            setControls(false);
        }
    }, []);

    const handleWaiting = React.useCallback(() => {
        setIsWaiting(true);
    });

    const handlePlay = React.useCallback(() => {
        function hideControls() {
            setControls(false);
        }

        // Hide player controls 3 sec after the video starts
        setTimeout(hideControls, 3000);
    });

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
    }, []);

    const handleTimeUpdate = React.useCallback(() => {
        setTimeline({ ...timeline, currentTime: player.current.currentTime });
    }, [timeline, player]);

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

    if (isWaiting) return <div className={styles.player}>Loading...</div>;

    return (
        <div className={styles.player}>
            {controls ? <Social /> : null}
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
            {controls ? (
                <Controls
                    isPlaying={isPlaying}
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
