import React, { useReducer, createContext } from 'react';

const initialItems = {
    loading: true,
    data: null,
    error: null,
};
const itemsReducer = (state, action) => {
    let likeInfo = JSON.parse(localStorage.getItem('nasa-like-2106261404'));

    window.ac = action.data;
    switch (action.type) {
        case 'SETTING_ITEMS':
            return {
                loading: true,
                data: state.data === null ? null : state.data,
                error: null,
            };
        case 'SET_ITEMS':
            return {
                loading: false,
                data: state.data === null ? action.data.map((i) => ({ ...i, date_now: 0 })) : state.data.concat(action.data),
                //data: action.data.map((i) => ({ ...i, date_now: 0 })),
                error: null,
            };
        case 'SET_ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        case 'UPDATE_LIKE':
            /*** localStorage 저장 과정 ***/
            // like를 누른 경우, 해당 nasa_id 배열로 저장 -> 순차적(like 누른 순) 저장을 위해 배열 사용
            if (likeInfo === null) {
                localStorage.setItem(
                    'nasa-like-2106261404',
                    JSON.stringify([{ ...action.data, isLike: true, date_now: new Date().getTime() }])
                );
            } else {
                likeInfo.unshift({ ...action.data, isLike: true, date_now: new Date().getTime() });
                localStorage.setItem('nasa-like-2106261404', JSON.stringify(likeInfo));
            }

            /*** context 저장 과정 ***/
            return {
                loading: false,
                data: state.data.map((obj) =>
                    obj.nasa_id === action.nasa_id
                        ? {
                              ...obj,
                              isLike: true,
                              date_now: new Date().getTime(),
                          }
                        : obj
                ),
                error: null,
            };
        case 'UPDATE_DISLIKE':
            /*** localStorage 저장 과정 ***/
            localStorage.setItem('nasa-like-2106261404', JSON.stringify(likeInfo.filter((i) => i.nasa_id !== action.nasa_id)));

            /*** context 저장 과정 ***/
            return {
                loading: false,
                data: state.data.map((obj) =>
                    obj.nasa_id === action.nasa_id
                        ? {
                              ...obj,
                              isLike: false,
                              date_now: 0,
                          }
                        : obj
                ),
                error: null,
            };
        default:
            return state;
    }
};

export const ItemsStateContext = createContext();
export const ItemsDispatchContext = createContext();

export function ItemsProvider({ children }) {
    const [state, dispatch] = useReducer(itemsReducer, initialItems);

    return (
        <ItemsStateContext.Provider value={state}>
            <ItemsDispatchContext.Provider value={dispatch}>{children}</ItemsDispatchContext.Provider>
        </ItemsStateContext.Provider>
    );
}
