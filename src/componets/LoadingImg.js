import React from 'react';
import styled from 'styled-components';

const ImgBox = styled.div`
    width: 212px;
    height: 111px;
    background-color: #e5e5e5;

    display: flex;
    align-items: center;
    justify-content: center;
`;
function LoadingImg() {
    return (
        <ImgBox>
            <svg width="34" height="8" viewBox="0 0 34 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" fill="#C4C4C4" />
                <circle cx="30" cy="4" r="4" fill="#C4C4C4" />
                <circle cx="17" cy="4" r="4" fill="#C4C4C4" />
            </svg>
        </ImgBox>
    );
}

export default LoadingImg;
