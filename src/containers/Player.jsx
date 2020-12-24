import React from 'react';
import Social from './Social';
import Controls from './Controls';
import * as styles from './containers.scss';

export default function Player() {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const player = React.useRef(null);

    const handlePlayPause = React.useCallback(() => {
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

        console.log('handleRewind');
        player.current.replay(10000);
        console.log(player.current.currentTime);
    }, []);
    const handleForward = React.useCallback(() => {

        console.log('handleForward');
        player.current.forward(10000);
        console.log(player.current.currentTime);
    }, []);

    const handleStop = React.useCallback(() => {
        player.current.pause();
        player.current.currentTime = 0;
        setIsPlaying(false);
    }, [setIsPlaying]);

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
                onStop={handleStop}
                onPlayPause={handlePlayPause}
                onForward={handleForward}
                onChangeTimeline={handleChangeTimeline}
                onRewind={handleRewind}
            />

        </div>
    );
}
