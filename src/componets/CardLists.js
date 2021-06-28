import React from 'react';
import Card from './Card';

function CardLists({ items }) {
    return (
        <div className="cards-wrapper">
            {items.map((i) => (
                <Card key={i.nasa_id} data={i} />
            ))}
        </div>
    );
}

export default CardLists;
