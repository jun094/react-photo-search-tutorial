import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/home.scss';
import LikeBox from '../componets/LikeBox';
import DropDownBtn from '../componets/btnGroup/DropDownBtn';
import Input from '../componets/btnGroup/Input';
import SearchBtn from '../componets/btnGroup/SearchBtn';
import CardLists from '../componets/CardLists';
import Loading from '../componets/Loading';
import DrawerList from '../componets/DrawerList';

function Home() {
    /** 변수 선언부 **/
    const API_URL = 'https://images-api.nasa.gov/search?q=seoul&page=1';

    const [items, setItems] = useState([]); // 사진 list 저장
    const [hits, setHits] = useState(0); // 사진 total 개수 저장
    const [isLoading, setIsLoading] = useState(true);
    const [drawerState, setDrawerState] = useState(true);

    /** 메소드들 **/
    //get API
    const getDatas = () => {
        Axios.get(API_URL).then((res) => {
            setItems(res.data.collection.items);
            setHits(res.data.collection.metadata.total_hists);

            setIsLoading(false);
        });
    };
    //click drawer
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState(open);
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
                <DrawerList anchor="right" drawerState={drawerState} toggleDrawer={toggleDrawer} />
                <LikeBox toggleDrawer={toggleDrawer} />

                {isLoading && <Loading />}
                {!isLoading && <CardLists items={items} />}
            </section>
        </div>
    );
}

export default Home;
