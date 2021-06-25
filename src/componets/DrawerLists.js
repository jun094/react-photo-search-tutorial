import React from 'react';
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
    return (
        <ListStyle>
            <h3>좋아요 리스트</h3>

            <div className="drawer-cards">
                <Card />
                <Card /> <Card />
            </div>
        </ListStyle>
    );
}

export default DrawerLists;
