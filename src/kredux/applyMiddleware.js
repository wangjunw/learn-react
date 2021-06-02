export default function applyMiddleware(...middles) {
    // 接收一组的中间件
    return (createStore) => (reducer) => {
        let store = createStore(reducer);
        let dispatch = store.dispatch; // 原版dispatch

        // 形成中间件链，每个中间件都执行一下，并传入一些方法
        // 为何要传入这样的middleApi，需要了解中间件的原理
        const middleApi = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args),
        };
        const middlesChain = middles.map((middle) => middle(middleApi));

        // 加强dispatch，传入原始dispatch经过一系列函数的执行
        dispatch = compose(...middlesChain)(dispatch);

        // 返回store和加强后的dispatch
        return {
            ...store,
            dispatch,
        };
    };
}
// 聚合函数，合并多个函数到一个函数中
function compose(...funs) {
    if (funs.length === 0) return (args) => args;
    if (funs.length === 1) return funs[0];
    return funs.reduce(
        (a, b) =>
            (...args) =>
                a(b(...args))
    );
}
