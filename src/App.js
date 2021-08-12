import React, { useEffect } from 'react';
import { Switch, Route, useHistory, withRouter } from 'react-router-dom';
import './styles/global.scss';
import './styles/bootstrap.v4.goorm.min.css';
import Home from './pages/Home';
import { ItemsProvider } from './ItemsContext';
import ErrorPage from './pages/ErrorPage';
import DatePicker from './componets/DatePicker/DatePicker';

const App = ({ location }) => {
    /** 선언부 **/
    const history = useHistory();

    /** 컴포넌트 마운트, 언마운트 **/
    useEffect(() => {
        // 최초 redirect는 'seoul'과 관련된 임의 데이터
        if (location.pathname === '/') history.replace('/search?q=seoul');
    }, []);

    return (
        // <ItemsProvider>
        //     <div className="app-root">
        //         <Switch>
        //             <Route path="/search" component={Home} />
        //             <Route component={ErrorPage} />
        //         </Switch>
        //     </div>
        // </ItemsProvider>

        <DatePicker />
    );
};

export default withRouter(App);
