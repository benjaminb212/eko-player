import React from 'react';
import { Like, Dislike } from 'components/Buttons';
import * as styles from './Votes.scss';

export default function Votes({handleLike, handleDislike}) {
    return (
        <div className={styles.votes}>
            <Like handleLike={handleLike} />
            <Dislike handleDislike={handleDislike} />
        </div>
    );
}
