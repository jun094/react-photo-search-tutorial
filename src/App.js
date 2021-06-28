import React, { useEffect } from 'react';
import { Route, useHistory, withRouter } from 'react-router-dom';
import './styles/global.scss';
import './styles/bootstrap.v4.goorm.min.css';
import Search from './pages/Search';

const App = ({ location }) => {
    const history = useHistory();

    useEffect(() => {
        // 최초 redirect는 'seoul'과 관련된 임의 데이터
        if (location.pathname === '/') history.replace('/search?q=seoul&page=1');
    }, []);

    return (
        <div className="app-root">
            <Route path="/search" component={Search} />
        </div>
    );
};

export default withRouter(App);
