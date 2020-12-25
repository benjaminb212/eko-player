import React from 'react';
import { Like, Dislike } from 'components/Buttons';
import firebase from 'services/firebase';
import * as styles from './Votes.scss';

/**
 *  A video votes are measured by users "claps" or "boos"
 *  */
export default function Votes() {
    const [votes, setVotes] = React.useState([]);

    React.useEffect(() => {
        const votesRef = firebase.database().ref('votes');
        votesRef.on('value', (snapshot) => {
            setVotes(snapshot.val());
        });
    }, []);

    const handleLike = React.useCallback(() => {
        const likeRef = firebase.database().ref();
        likeRef.update({ votes: votes + 1 });
    }, [votes]);

    const handleDislike = React.useCallback(() => {
        if (votes === 0) {
            return;
        }
        const likeRef = firebase.database().ref();
        likeRef.update({ votes: votes - 1 });
    }, [votes]);

    return (
        <div className={styles.votes}>
            <Like handleLike={handleLike} />
            <span>{votes}</span>
            <Dislike handleDislike={handleDislike} />
        </div>
    );
}
