import React, { useState } from 'react';
import styled from 'styled-components';

import { withRouter } from 'react-router-dom';

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
    const [text, setText] = useState('검색어를 입력해주세요');

    const onChange = (e) => {
        setText(e.target.value);
    };

    return <InputStyle onChange={onChange} value={text}></InputStyle>;
}

export default Input;
