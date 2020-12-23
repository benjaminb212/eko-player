import React from 'react';
import { Views, Votes } from '../components';
import * as styles from './containers.scss';

export default function Social() {
    //Get the views & votes from DB

    return (
        <div className="social">
            <Views />
            <Votes />
        </div>
    );
}
