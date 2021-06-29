import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import '../styles/home.scss';
import LikeBox from '../componets/LikeBox';
import DropDownBtn from '../componets/searchBtnGroup/DropDownBtn';
import Input from '../componets/searchBtnGroup/Input';
import SearchBtn from '../componets/searchBtnGroup/SearchBtn';
import CardLists from '../componets/CardLists';
import Loading from '../componets/Loading';
import Drawer from '../componets/Drawer';
import DrawerLists from '../componets/DrawerLists';
import qs from 'qs';
import { ItemsStateContext, ItemsDispatchContext } from '../ItemsContext';

const Search = ({ location }) => {
    /** 변수 선언부 **/
    const state = useContext(ItemsStateContext);
    const dispatch = useContext(ItemsDispatchContext);

    const [query, setQuery] = useState(
        qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })
    );
    const [drawerOpen, setDrawerOpen] = useState(false);

    window.state = state;

    /** 메소드들 **/
    //get API
    const getDatas = async () => {
        dispatch({ type: 'SETTING_ITEMS' });

        try {
            const res = await Axios.get(`https://images-api.nasa.gov/search${location.search}`);

            //localStorage에서 like 정보를 가져옴.
            let likeArr = [];
            if (localStorage.getItem('nasa-like-2106261404') !== null) {
                likeArr = JSON.parse(localStorage.getItem('nasa-like-2106261404'));
            }

            //API에서 불러온 data와 like정보를 함께 전역 상태로 관리
            dispatch({
                type: 'SET_ITEMS',
                data: res.data.collection.items.map((i) => {
                    return {
                        ...i.data[0],
                        imgurl: i.links[0].href,
                        isLike: likeArr.indexOf(i.data[0].nasa_id) === -1 ? false : true,
                    };
                }),
            });
        } catch (e) {
            dispatch({ type: 'SET_ERROR', error: e });
        }
    };

    //click drawer
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    /** 컴포넌트 마운트, 언마운트 **/
    useEffect(() => {
        getDatas();
    }, []);

    return (
        <div className="wrapper">
            <header>
                <h1 className="header-text">NASA 사진 검색</h1>
                <div className="header-search-box">
                    <DropDownBtn />
                    <Input />
                    <SearchBtn />
                </div>
            </header>

            <section>
                <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} colo="#000000" backgroundColor="#F7F7FA">
                    <DrawerLists />
                </Drawer>
                <LikeBox toggleDrawer={toggleDrawer} />

                {state.loading === true && state.data === null ? <Loading /> : <CardLists items={state.data} />}
            </section>
        </div>
    );
};

export default React.memo(Search);
