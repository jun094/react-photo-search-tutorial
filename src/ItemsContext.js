import React, { useReducer, createContext } from 'react';

const initialItems = {
    loading: true,
    data: null,
    error: null,
};
const itemsReducer = (state, action) => {
    let likeInfo = JSON.parse(localStorage.getItem('nasa-like-2106261404'));

    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: state.data === null ? null : state.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };

        case 'SET_ITEMS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ADD_ITEMS':
            return {
                loading: false,
                data: state.data.concat(action.data),
                error: null,
            };
        case 'UPDATE_LIKE':
            /*** localStorage 저장 과정 ***/
            // like를 누른 경우, 해당 nasa_id 배열로 저장 -> 순차적(like 누른 순) 저장을 위해 배열 사용
            if (likeInfo === null) {
                localStorage.setItem('nasa-like-2106261404', JSON.stringify([{ ...action.data, isLike: true }]));
            } else {
                likeInfo.unshift({ ...action.data, isLike: true });
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
