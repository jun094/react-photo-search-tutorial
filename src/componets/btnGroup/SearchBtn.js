import React from 'react';
import styled from 'styled-components';

const BtnStyle = styled.button`
    padding: 9px 16px;
    height: 40px;
    box-sizing: border-box;
    background: #5094fa;
    border-radius: 0px 3px 3px 0px;
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
`;

function SearchBtn() {
    return <BtnStyle>검색하기</BtnStyle>;
}

export default SearchBtn;
