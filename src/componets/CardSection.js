import React, { useState, useEffect, useContext, useCallback } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import qs from 'qs';
import { ItemsStateContext, ItemsDispatchContext } from '../ItemsContext';
import Axios from 'axios';
import LikeBox from './LikeBox';
import CardLists from './CardLists';
import Loading from './Loading';
import Drawer from './Drawer';
import DrawerLists from './DrawerLists';
import styled from 'styled-components';
import ErrorPage from '../pages/ErrorPage';

const NoneLoading = styled.div`
    min-height: 70px;
`;

function CardSection({ location }) {
    /** 변수 선언부 **/
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    }); // url query string
    const history = useHistory();
    const state = useContext(ItemsStateContext);
    const dispatch = useContext(ItemsDispatchContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { data, loading, error } = state;

    /** 메소드들 **/
    //get API
    const getDatas = async (mode) => {
        if (!query || query.q === '') {
            //query문이 없을 때는 기본 홈페이지로 이동 -> seoul 데이터 페이지
            return history.replace('/search?q=seoul');
        }

        const key = Object.keys(query)[0]; //query의 객체의 키값
        const val = query[Object.keys(query)[0]]; //query 객체의 value값
        let pageNum = 1; //무한스크롤을 위한 Page number
        let likeArr = []; // 좋아요기능을 위한 nase_id 정보를 담을 배열

        dispatch({ type: 'LOADING' });

        try {
            // 1. API 처리
            const res = await Axios.get(`https://images-api.nasa.gov/search?${key}=${val === '' ? '' : val}&page=${pageNum}`);

            console.log(`https://images-api.nasa.gov/search?${key}=${val === '' ? '' : val}&page=${pageNum}`);

            // 2. LocalStorage 처리 (like 정보와 page number 정보)
            if (mode === 'init-data') {
                localStorage.setItem('nasa-pageNum-1624981086186', 1); //처음에는 page number 1을 Localstorage에 저장
            } else {
                pageNum = localStorage.getItem('nasa-pageNum-1624981086186'); //다음부터는 page number에서 1을 더한 값을 사용
            }

            if (localStorage.getItem('nasa-like-2106261404') !== null) {
                //localStorage에서 like 정보를 가져옴.
                //이후, nasa_id만 추출
                likeArr = JSON.parse(localStorage.getItem('nasa-like-2106261404')).map((i) => i.nasa_id);
            }

            //API에서 불러온 data와 like정보를 함께 전역 상태로 관리
            if (res.data.collection.items !== null) {
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
            }
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
            localStorage.setItem('nasa-pageNum-1624981086186', localStorage.getItem('nasa-pageNum-1624981086186') * 1 + 1);

            getDatas('more-data');
        }
    };

    /** 컴포넌트 마운트, 언마운트 **/
    useEffect(() => {
        //get API
        getDatas('init-data');

        //window 객체가 scroll 됐을 때
        window.addEventListener('scroll', handleInfinitScroll);

        return () => {
            window.removeEventListener('scroll', handleInfinitScroll);
        };
    }, [location.search]);

    return (
        <>
            <Drawer open={drawerOpen} toggleDrawer={handletoggleDrawer} colo="#000000" backgroundColor="#F7F7FA">
                <DrawerLists />
            </Drawer>
            <LikeBox open={drawerOpen} toggleDrawer={handletoggleDrawer} />

            {
                //1. loading=false & api에서 data = null 일때 -> error
                //2. loading=false & api에서 data length가 0 일때 -> 찾는 정보 없음
                //3. loading=false & api에서 data length가 0 이상 -> 카드 표시
                //4. loading 중이면 무조건 로딩 표시
            }

            {loading === false ? data === null ? <ErrorPage e={error} /> : <CardLists items={data} /> : null}
            {loading === true ? <Loading /> : <NoneLoading />}
        </>
    );
}

export default React.memo(withRouter(CardSection));
