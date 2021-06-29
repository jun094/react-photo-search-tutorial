import React, { useReducer } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    cursor: pointer;
    width: fit-content;
    padding: 9px 16px;
    display: flex;
    align-items: center;
    background: ${(props) => (props.open ? '#5094fa24' : '#85889914')};

    border-radius: 3px;

    & p {
        margin: 0 0 0 10px;
        color: ${(props) => (props.open ? '#1D6CE0' : '#525463')};

        font-size: 14px;
        font-weight: 500;
    }
`;

function LikeBox({ open, toggleDrawer }) {
    return (
        <Box open={open} onClick={toggleDrawer}>
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.8808 1.36531C14.2308 -0.284688 11.5571 -0.284688 9.90705 1.36531L8.9983 2.27406L8.08705 1.36156C6.43705 -0.287188 3.76205 -0.287188 2.11205 1.36156C0.463301 3.01156 0.463301 5.68656 2.11205 7.33531L3.02455 8.24781L3.0233 8.24906L8.9983 14.2228L15.8808 7.33906C17.5308 5.69031 17.5308 3.01406 15.8808 1.36531Z"
                    fill={open ? '#1D6CE0' : '#525463'}
                />
            </svg>

            <p>좋아요 리스트 보기</p>
        </Box>
    );
}

export default LikeBox;
