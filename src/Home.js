import React from 'react';
import './styles/home.scss';
import Cards from './componets/Cards';
import Card from './componets/Card';

function Home() {
    return (
        <div className="wrapper">
            <div className="header">NASA 사진 검색</div>
            <Cards>
                <Card /> <Card />
                <Card /> <Card />
                <Card /> <Card />
                <Card /> <Card />
                <Card />
            </Cards>
        </div>
    );
}

export default Home;
