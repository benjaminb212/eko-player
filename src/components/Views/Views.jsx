import React from 'react';
import EyeIcon from 'assets/eye.svg';
import firebase from 'services/firebase';
import * as styles from './Views.scss';

export default function Views({ isVisibilityActive }) {
    const [views, setViews] = React.useState([]);

    // Get the views counter
    React.useEffect(() => {
        const viewsRef = firebase.database().ref('views');

        const getViews = (snapshot) => setViews(snapshot.val());
        viewsRef.on('value', getViews);

        // Handling the cleanup of subscribed getViews handler in firebase.
        // return () => {
        //     getViews();
        // };
    }, []);

    return (
        <div
            className={styles.views}
            style={{ visibility: isVisibilityActive ? 'visible' : 'hidden' }}
        >
            <EyeIcon className={styles.eye} />
            <span className={styles.counter}>{views}</span>
        </div>
    );
}
