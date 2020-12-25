import React from 'react';
import Eye from 'assets/Eye.png';
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
            <img className={styles.eye} src={Eye} alt="Eye" />
            <span className={styles.counter}>{views}</span>
        </div>
    );
}
