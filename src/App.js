import React, { useEffect } from 'react';
import { Route, useHistory, withRouter } from 'react-router-dom';
import './styles/global.scss';
import './styles/bootstrap.v4.goorm.min.css';
import Search from './pages/Search';
import { ItemsProvider } from './ItemsContext';

const App = ({ location }) => {
    /** 선언부 **/
    const history = useHistory();

    /** 컴포넌트 마운트, 언마운트 **/
    useEffect(() => {
        // 최초 redirect는 'seoul'과 관련된 임의 데이터
        if (location.pathname === '/') history.replace('/search?q=seoul&page=1');
    }, []);

    return (
        <ItemsProvider>
            <div className="app-root">
                <Route path="/search" component={Search} />
            </div>
        </ItemsProvider>
    );
};

export default withRouter(App);
