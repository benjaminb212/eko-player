import React from 'react';
import Circle from 'assets/Circle.png';

export default function Rewind({ handleRewind }) {
    return <img onClick={handleRewind} src={Circle} alt="RWD" />;
}
