import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

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

function Input({ history, location }) {
    const [text, setText] = useState(
        qs.parse(location.search, {
            ignoreQueryPrefix: true,
        }).q
    );

    const onChange = (e) => {
        const { value } = e.target;

        setText(value);
        history.replace(`/search?q=${value}`);
    };

    return <InputStyle onChange={onChange} value={text} placeholder="검색어를 입력해주세요"></InputStyle>;
}

export default withRouter(React.memo(Input));
