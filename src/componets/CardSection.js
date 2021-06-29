import React, { useState, useEffect, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { ItemsStateContext, ItemsDispatchContext } from '../ItemsContext';
import Axios from 'axios';
import LikeBox from './LikeBox';
import CardLists from './CardLists';
import Loading from './Loading';
import Drawer from './Drawer';
import DrawerLists from './DrawerLists';
import Error from './Error';
import styled from 'styled-components';

const NoneLoading = styled.div`
    min-height: 70px;
`;

function CardSection({ location }) {
    /** 변수 선언부 **/
    const state = useContext(ItemsStateContext);
    const dispatch = useContext(ItemsDispatchContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    window.state = state;

    /** 메소드들 **/
    //get API
    const getDatas = async (mode) => {
        let query = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        }).q; // url query string

        let pageNum = 1; //무한스크롤을 위한 Page num

        if (mode === 'init-data') {
            localStorage.setItem('nasa-pageNum-1624981086186', 1); //처음에는 1을 Localstorage에 저장
        } else {
            pageNum = localStorage.getItem('nasa-pageNum-1624981086186'); //다음부터는 1을 더한 값을 사용
        }

        dispatch({ type: 'LOADING' });

        console.log(mode, query, pageNum);

        try {
            const res = await Axios.get(`https://images-api.nasa.gov/search?q=${query === '' ? '' : query}&page=${pageNum}`);

            let likeArr = []; // like를 누른 nasa_id만 저장할 임시 배열
            if (localStorage.getItem('nasa-like-2106261404') !== null) {
                //localStorage에서 like 정보를 가져옴.
                //이후, nasa_id만 추출
                likeArr = JSON.parse(localStorage.getItem('nasa-like-2106261404')).map((i) => i.nasa_id);
            }

            //API에서 불러온 data와 like정보를 함께 전역 상태로 관리
            dispatch({
                type: mode === 'init-data' ? 'SET_ITEMS' : 'ADD_ITEMS',
                data: res.data.collection.items
                    .filter((i) => i.links)
                    .map((i) => {
                        return {
                            ...i.data[0],
                            imgurl: i.links[0].href,
                            isLike: likeArr.indexOf(i.data[0].nasa_id) === -1 ? false : true,
                        };
                    }),
            });

            //무한스크롤을 위한 page number 저장
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    };
    //click drawer
    const handletoggleDrawer = useCallback(() => {
        setDrawerOpen(!drawerOpen);
    }, [drawerOpen]);

    //infinite scroll
    const handleInfinitScroll = async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            console.log('무한 스크롤 !');
            localStorage.setItem('nasa-pageNum-1624981086186', localStorage.getItem('nasa-pageNum-1624981086186') * 1 + 1);

            getDatas('more-data');
        }
    };

    /** 컴포넌트 마운트, 언마운트 **/
    useEffect(() => {
        //getAPI
        getDatas('init-data');

        //window객체가 scroll 됐을 때
        window.addEventListener('scroll', handleInfinitScroll);

        return () => {
            window.removeEventListener('scroll', handleInfinitScroll);
        };
    }, [location.search]);

    if (state.error) {
        console.error(state.error);
        return <Error />;
    }

    return (
        <>
            <Drawer open={drawerOpen} toggleDrawer={handletoggleDrawer} colo="#000000" backgroundColor="#F7F7FA">
                <DrawerLists />
            </Drawer>
            <LikeBox open={drawerOpen} toggleDrawer={handletoggleDrawer} />

            {(!state.loading || state.data !== null) && <CardLists items={state.data} />}
            {state.loading ? <Loading /> : <NoneLoading />}
        </>
    );
}

export default React.memo(withRouter(CardSection));
