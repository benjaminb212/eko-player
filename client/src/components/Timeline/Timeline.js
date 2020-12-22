import styles from './Timeline.scss';
export default function Timeline(props) {
    return (
        <div className={styles.timeline}>
            <span class="currentTimeCaption">Current time:</span>
            <span class="currentTime">0:00</span>
        </div>
    );
}
