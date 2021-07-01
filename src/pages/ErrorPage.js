import React from 'react';
import '../styles/errorpage.scss';

const ErrorPage = ({ e }) => {
    console.log(e);
    return (
        <div className="wrapper">
            {e ? (
                <h1 className="error-header">400 ERROR 입니다.</h1>
            ) : (
                <h1 className="error-header">요청하신 페이지를 찾을 수 없습니다.</h1>
            )}
        </div>
    );
};

export default ErrorPage;
