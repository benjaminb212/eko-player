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

    const handleRewind = React.useCallback(
        (seconds) => {
            return () => {
                player.current.pause();
                player.current.replay(seconds);
                console.log(player.current.currentTime);
            };
        },
        [player]
    );
    const handleForward = React.useCallback(
        (seconds) => {
            return () => {
                player.current.pause();
                player.current.forward(seconds);
                console.log(player.current.currentTime);
            };
        },
        [player]
    );

    return (
        <div className={styles.player}>
            <video ref={player}>
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
                onPlayPause={handlePlayPause}
                onForward={handleForward}
                onChangeTimeline={handleChangeTimeline}
                onRewind={handleRewind}
            />
            <Social />
        </div>
    );
}
