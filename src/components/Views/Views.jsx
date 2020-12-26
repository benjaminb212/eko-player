import React from 'react';
import EyeIcon from 'assets/eye.svg';
import firebase from 'services/firebase';
import * as styles from './Views.scss';

export default function Views() {
    const [views, setViews] = React.useState([]);

    // Get the views counter
    React.useEffect(() => {
        const viewsRef = firebase.database().ref('views');
        viewsRef.on('value', (snapshot) => {
            setViews(snapshot.val());
        });
    }, []);

    return (
        <div className={styles.views}>
            <EyeIcon className={styles.eye} />
            <span className={styles.counter}>{views}</span>
        </div>
    );
}
