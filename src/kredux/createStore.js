export default function createStore(reducer, enhancer) {
    // enhancer即applyMiddleware()的执行返回的函数
    if (enhancer) {
        // 传入createStore和reducer到enhancer内部，直接返回applyMiddleware中返回的store和加强版的dispatch
        return enhancer(createStore)(reducer);
    }

    let currentState;
    let listeners = [];
    function getState() {
        return currentState;
    }
    function dispatch(action) {
        currentState = reducer(currentState, action);
        listeners.forEach((listener) => listener());
    }
    function subscribe(listener) {
        // 监听函数，数据变化时会执行监听函数
        listeners.push(listener);
        // 取消订阅
        return () => {
            listeners = listeners.filter((item) => item !== listener);
        };
    }
    // 保证有state的初始值，自动执行一下
    dispatch({ type: '0000000/xxxxxxxx' });
    return {
        getState,
        subscribe,
        dispatch,
    };
}
