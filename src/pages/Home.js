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

function Home() {
    const [items, setItems] = useState([]); // 사진 list 저장
    const [hits, setHits] = useState(0); // 사진 total 개수 저장
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = 'https://images-api.nasa.gov/search?q=seoul&page=1';

    const getDatas = () => {
        setTimeout(() => {
            Axios.get(API_URL).then((res) => {
                setItems(res.data.collection.items);
                setHits(res.data.collection.metadata.total_hists);

                setIsLoading(false);
            });
        }, 1000);
    };
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
                <LikeBox />

                {isLoading && <Loading />}
                {!isLoading && <CardLists items={items} />}
            </section>
        </div>
    );
}

export default Home;
