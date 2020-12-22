import { Timeline, Forward, Rewind, PlayPause, Stop } from '../components';
import styles from './styles.scss';
export default function Controls(props) {
    //Get the time from db
    return (
        <div className={styles.controls}>
            <Forward />
            <Rewind />
            <PlayPause />
            <Stop />
            <Timeline />
        </div>
    );
}
