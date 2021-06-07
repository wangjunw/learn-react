// import { applyMiddleware, createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import promise from 'redux-promise';
import isPromise from 'is-promise'; // 判断是不是promise类型
import { isFSA } from 'flux-standard-action'; // 判断是不是标准的action{type: xx, payload: xx}

import { createStore, applyMiddleware, combineReducers } from '../kredux/';
export function countReducer(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'MINUS':
            return state - action.payload;
        default:
            return state;
    }
}
function numReducer(state = { num: 0, isLogin: false }, { type, payload }) {
    switch (type) {
        case 'ADD2':
            return {
                ...state,
                num: state.num + payload,
            };
        case 'LOGIN':
        case 'LOGOUT':
            return {
                ...state,
                isLogin: payload,
            };
        default:
            return state;
    }
}

const store = createStore(
    // countReducer,
    combineReducers({ num: numReducer, count: countReducer }),
    applyMiddleware(thunk, logger, promise)
);
export default store;

/**
 * 中间件接受store中的方法,
 * const middleApi = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args),
    };
 *  */
function thunk({ dispatch, getState }) {
    // 区分调用dispatch传入的是普通对象，还是函数
    // 这里在thunk后添加logger，所以next为logger
    return (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        } else {
            next(action);
        }
    };
}

function logger({ dispatch, getState }) {
    // logger后没有其他中间件了，所以next为dispatch
    return (next) => (action) => {
        console.log(action.type);
        const prevState = getState();
        console.log('prevState==', prevState);

        const res = next(action);
        console.log('nextState===', getState());
        return res;
    };
}

function promise({ dispatch, getState }) {
    return (next) => (action) => {
        if (!isFSA(action)) {
            return isPromise(action)
                ? action.then(dispatch)
                : // ? action.then((res) => dispatch(res)) // 相等上面，多加了一层
                  next(action);
        }
        // 如果action是标准action，判断action.payload是不是promise，如果payload是promise，则将最终结果当作action传入dispatch
        return isPromise(action.payload)
            ? action.payload.then((res) =>
                  dispatch({ ...action, payload: res })
              )
            : next(action);
    };
}
