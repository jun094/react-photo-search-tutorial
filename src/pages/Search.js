import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
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

function Search({ location }) {
    /** 변수 선언부 **/
    const [query, setQuery] = useState(
        qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })
    );
    const [items, setItems] = useState([]); // 사진 list 저장
    const [isLoading, setIsLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    window.items = items;

    /** 메소드들 **/
    //get API
    const getDatas = () => {
        Axios.get(`https://images-api.nasa.gov/search${location.search}`).then((res) => {
            console.log(res.data.collection.items);
            console.log(JSON.parse(localStorage.getItem('nasa-like-2106261404')));

            const arr = res.data.collection.items;
            window.arr = arr;
            // if (localStorage.getItem('nasa-like-2106261404') !== null) {
            // }

            //api에서 불러온 card-list 상태 관리
            setItems(
                res.data.collection.items.map((i) => {
                    return {
                        data: {
                            ...i.data[0],
                            imgurl: i.links[0].href,
                            isLike: false,
                        },
                    };
                })
            );

            //동기적 흐름을 위한 loading UI
            setIsLoading(false);
        });
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

                {isLoading && <Loading />}
                {!isLoading && <CardLists items={items} />}
            </section>
        </div>
    );
}

export default Search;
