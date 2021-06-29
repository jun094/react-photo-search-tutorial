import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const StyleError = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 120px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    & > span {
        color: #5094fa;
        font-weight: 500;
    }
`;
const Error = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const key = Object.keys(query)[0];

    return (
        <StyleError>
            <span>‘{query[key]}'</span>에 대한 검색결과가 없습니다.
        </StyleError>
    );
};

export default withRouter(React.memo(Error));
