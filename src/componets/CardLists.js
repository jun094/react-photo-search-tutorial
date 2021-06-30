import React from 'react';
import Card from './Card';
import styled from 'styled-components';
import Error from './Error';

const StyleSearchWrapper = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    row-gap: 20px;
    column-gap: 20px;
`;
function CardLists({ items }) {
    if (items === null || items.length === 0) return <Error />;
    return (
        <StyleSearchWrapper>
            {items.map((i, idx) => (
                <Card key={i.nasa_id + i.title} data={i} />
            ))}
        </StyleSearchWrapper>
    );
}

export default React.memo(CardLists);
