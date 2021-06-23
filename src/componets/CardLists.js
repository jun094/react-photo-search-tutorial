import React, { useEffect } from 'react';
import Card from './Card';

function CardLists({ items }) {
    return (
        <div className="cards-wrapper">
            {items.map((i) => (
                <Card key={i.data[0].nasa_id} data={i.data[0]} img={i.href} />
            ))}
        </div>
    );
}

export default CardLists;
