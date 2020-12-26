import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Player from './containers/Player';

ReactDOM.render(
    <React.StrictMode>
        <Player />
    </React.StrictMode>,
    document.getElementById('root')
);

module.hot.accept();
