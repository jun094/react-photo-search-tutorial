import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
    width: 276px;
    height: 40px;
    padding: 0 9px;
    background: #ffffff;
    border: 1px solid #cdced6;
    box-sizing: border-box;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #2b2d36;

    &::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #858899;
    }
`;

function Input() {
    return <InputStyle placeholder="검색어를 입력해주세요"></InputStyle>;
}

export default Input;
