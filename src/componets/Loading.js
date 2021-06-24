import React from 'react';
import styled from 'styled-components';

const LoadingBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    width: inherit;
`;

function Loading() {
    return <LoadingBox>로딩중...</LoadingBox>;
}

export default Loading;
