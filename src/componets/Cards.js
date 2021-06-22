import React from 'react';
import '../styles/cards.scss';

function Cards({ children }) {
    return <div className="cards-root">{children}</div>;
}

export default Cards;
