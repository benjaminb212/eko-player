import React from 'react';
import { Like, Dislike } from 'components/Buttons';
import firebase from 'services/firebase';
import * as styles from './Votes.scss';

// A video votes are measured by users "claps" or "boos"
export default function Votes({ isVisibilityActive }) {
    const [votes, setVotes] = React.useState([]);

    React.useEffect(() => {
        const votesRef = firebase.database().ref('votes');

        const getVotes = (snapshot) => {
            setVotes(snapshot.val());
        };
        votesRef.on('value', getVotes);

        // Handling the cleanup of subscribed getVotes handler in firebase.
        // return () => {
        //     getVotes();
        // };
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
        <div
            className={styles.votes}
            style={{ visibility: isVisibilityActive ? 'visible' : 'hidden' }}
        >
            <Like handleLike={handleLike} />
            <div className={styles.counter}>{votes}</div>
            <Dislike handleDislike={handleDislike} />
        </div>
    );
}
