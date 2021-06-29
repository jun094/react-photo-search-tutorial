import React from 'react';
import '../styles/home.scss';
import DropDownBtn from '../componets/searchBtnGroup/DropDownBtn';
import Input from '../componets/searchBtnGroup/Input';
import SearchBtn from '../componets/searchBtnGroup/SearchBtn';
import CardSection from '../componets/CardSection';

const Home = () => {
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
                <CardSection />
            </section>
        </div>
    );
};

export default React.memo(Home);
