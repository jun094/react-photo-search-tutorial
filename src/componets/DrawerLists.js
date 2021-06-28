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
    const [list, setList] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('nasa-like-2106261404')) setList(JSON.parse(localStorage.getItem('nasa-like-2106261404')));
    }, []);

    window.list = list;
    return (
        <ListStyle>
            <h3>좋아요 리스트</h3>
            {list.length === 0 ? (
                <div className="drawer-none-cards"> 좋아요 리스트가 없습니다 :(</div>
            ) : (
                <div className="drawer-cards">
                    {list.map((i) => (
                        <Card key={i.nasa_id} />
                    ))}
                </div>
            )}
        </ListStyle>
    );
}

export default DrawerLists;
