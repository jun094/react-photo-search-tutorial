import React, { useReducer } from 'react';
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

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ITEMS':
            return {
                data: action.data,
            };

        default:
            return state;
    }
}

//card-items 데이터들 전역 처리를 위한 Context API
export const ItemsDispatch = React.createContext(null);

const Search = ({ location }) => {
    /** 변수 선언부 **/
    const [query, setQuery] = useState(
        qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })
    );
    const [isLoading, setIsLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [items, dispatch] = useReducer(reducer, []); // 사진 itmes 전역 상태로 저장

    window.items = items;

    /** 메소드들 **/
    //get API
    const getDatas = () => {
        Axios.get(`https://images-api.nasa.gov/search${location.search}`).then((res) => {
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

            //사용자에게 동기적 흐름을 보여주기 위한 loading 변수
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
        <ItemsDispatch.Provider value={dispatch}>
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
                    {!isLoading && <CardLists items={items.data} />}
                </section>
            </div>
        </ItemsDispatch.Provider>
    );
};

export default Search;
