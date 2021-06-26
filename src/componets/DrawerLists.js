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
`;

function DrawerLists() {
    const [list, setList] = useState([]);

    console.log(list);

    useEffect(() => {
        setList(JSON.parse(localStorage.getItem('nasa-like-2106261404')));
    }, []);

    return (
        <ListStyle>
            <h3>좋아요 리스트</h3>

            <div className="drawer-cards">
                {list.map((i) => (
                    <Card key={i} />
                ))}
            </div>
        </ListStyle>
    );
}

export default DrawerLists;
