import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';

const ListStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & h3 {
        font-size: 20px;
        line-height: 30px;
        margin: 0;
    }
    & .drawer-cards {
        display: flex;
        flex-direction: column;
        margin-top: 32px;

        & > div + div {
            margin-top: 20px;
        }
    }
    & .drawer-none-cards {
        font-size: 16px;
        min-width: 212px;
        text-align: center;
        margin-top: 24px;
    }
`;

function DrawerLists() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('nasa-like-2106261404')) setItems(JSON.parse(localStorage.getItem('nasa-like-2106261404')));
    }, []);

    return (
        <ListStyle>
            <h3>좋아요 리스트</h3>
            {items.length === 0 ? (
                <div className="drawer-none-cards"> 좋아요 리스트가 없습니다 :(</div>
            ) : (
                <div className="drawer-cards">
                    {/* {items.map((i) => (
                        <Card key={i.data.nasa_id} data={i.data} />
                    ))} */}
                </div>
            )}
        </ListStyle>
    );
}

export default DrawerLists;
