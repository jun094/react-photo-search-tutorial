import React from 'react';
import Card from './Card';

function CardLists({ items }) {
    return (
        <div className="cards-wrapper">
            {items.map((i) => (
                <Card key={i.data.nasa_id} data={i.data} />
            ))}
        </div>
    );
}

export default CardLists;
