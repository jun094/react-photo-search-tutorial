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
    const getDatas = async (mode, CancelTokenSource) => {
        if (!query || query.q === '') {
            //query문이 없을 때는 기본 홈페이지로 이동 -> seoul 데이터 페이지
            return history.push('/search?q=seoul');
        }

        const key = Object.keys(query)[0]; //query의 객체의 키값
        const val = query[Object.keys(query)[0]]; //query 객체의 value값

        let pageNum = 1; //무한스크롤을 위한 Page number
        let likeArr = []; // 좋아요 기능을 위한 nase_id 정보를 담을 배열

        dispatch({ type: 'LOADING', data: mode });

        try {
            // 1. LocalStorage 처리 (like 정보와 page number 정보)
            if (mode === 'init-data') {
                localStorage.setItem('nasa-pageNum-1624981086186', 1); //처음에는 page number 1을 Localstorage에 저장
            } else {
                pageNum = localStorage.getItem('nasa-pageNum-1624981086186'); //다음부터는 page number에서 1을 더한 값을 사용
            }

            if (localStorage.getItem('nasa-like-2106261404') !== null) {
                likeArr = JSON.parse(localStorage.getItem('nasa-like-2106261404')).map((i) => i.nasa_id); //localStorage에서 like 카드의 nasa_id 정보를 가져옴.
            }

            // 2. API 처리
            const res = await Axios.get(`https://images-api.nasa.gov/search?${key}=${val === '' ? '' : val}&page=${pageNum}`, {
                cancelToken: CancelTokenSource.token,
            });

            //API에서 불러온 data와 like정보를 함께 전역 상태로 관리
            if (res.data.collection.items !== null) {
                dispatch({
                    type: 'SET_ITEMS',
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
            if (Axios.isCancel(e)) {
                // api 호출 취소
            } else {
                dispatch({ type: 'ERROR', error: e }); // 기본 오류 처리
            }
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

            getDatas('more-data', 'cancel');
        }
    };

    /** 컴포넌트 마운트, 언마운트 **/
    useEffect(() => {
        const CancelTokenSource = Axios.CancelToken.source(); //무자비한 API 호출 방지를 위한 취소 토큰 생성

        getDatas('init-data', CancelTokenSource); //get API

        window.addEventListener('scroll', handleInfinitScroll); //window 객체가 scroll 됐을 때

        return () => {
            window.removeEventListener('scroll', handleInfinitScroll);
            CancelTokenSource.cancel(); // data처리가 되기 전에 컴포넌트가 리마운트된다면, 기존 API 호출은 취소
        };
    }, [location.search]);

    //console.log(error, data);
    return (
        <>
            <Drawer open={drawerOpen} toggleDrawer={handletoggleDrawer} colo="#000000" backgroundColor="#F7F7FA">
                <DrawerLists />
            </Drawer>
            <LikeBox open={drawerOpen} toggleDrawer={handletoggleDrawer} />

            {
                //case 1. error인 경우 -> error page
                //case 2. loading = true & data=null 인 경우 -> spinner
                //case 3. loading = true & data 있는 경우 -> data & spinner
                //case 4. loading false 인 경우 -> data & none-spinner
            }

            {error ? (
                <ErrorPage e={error} />
            ) : loading === true && data == null ? (
                <Loading />
            ) : loading === true && data ? (
                <>
                    <CardLists items={data} />
                    <Loading />
                </>
            ) : (
                <>
                    <CardLists items={data} />
                    <NoneLoading />
                </>
            )}
        </>
    );
}

export default React.memo(withRouter(CardSection));
