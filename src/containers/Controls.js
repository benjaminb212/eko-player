import { Time } from '../components';
export default function Controls(props) {
    return (
        <div className="controls">
            <button id="playPause">Play/Pause</button>
            <Time />
        </div>
    );
}
