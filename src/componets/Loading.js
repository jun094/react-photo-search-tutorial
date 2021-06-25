import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const LoadingBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    width: inherit;
`;

function Loading() {
    return (
        <LoadingBox>
            <Spinner color="dark" />
        </LoadingBox>
    );
}

export default Loading;
