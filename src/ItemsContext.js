import React, { useReducer, createContext } from 'react';

const initialItems = {
    loading: true,
    data: null,
    error: null,
};
const itemsReducer = (state, action) => {
    switch (action.type) {
        case 'SETTING_ITEMS':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SET_ITEMS':
            return {
                loading: false,
                data: action.data.map((i) => ({ ...i, date_now: 0 })),
                error: null,
            };
        case 'SET_ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        case 'UPDATE_LIKE':
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
