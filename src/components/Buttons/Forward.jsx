import React from 'react';
import Circle from 'assets/Circle.png';

export default function Forward({ handleForward }) {
    return <img onClick={handleForward} src={Circle} alt="FWD" />;
}
