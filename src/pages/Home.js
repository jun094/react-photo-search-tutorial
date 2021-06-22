import React from 'react';
import '../styles/home.scss';
import Card from '../componets/Card';
import LikeBox from '../componets/LikeBox';
import DropDownBtn from '../componets/btnGroup/DropDownBtn';
import Input from '../componets/btnGroup/Input';
import SearchBtn from '../componets/btnGroup/SearchBtn';

function Home() {
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
                <div className="cards-wrapper">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </section>
        </div>
    );
}

export default Home;
