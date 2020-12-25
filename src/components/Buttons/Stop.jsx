import React from 'react';
import Square from 'assets/Square.png';

export default function Stop({ handleStop }) {
    return <img onClick={handleStop} src={Square} alt="STOP" />;
}
