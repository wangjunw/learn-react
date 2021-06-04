import React, { useContext, useLayoutEffect, useReducer } from 'react';

export function bindActionCreators(creators, dispatch) {
    //对creators中得每个函数都包含一层dispatch
    let obj = {};
    for (const key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch);
    }
    return obj;
}
const bindActionCreator = (fn, dispatch) => {
    // args参数不要丢
    return (...args) => dispatch(fn(...args));
};

const Context = React.createContext();
export const Provider = ({ children, store }) => {
    return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const connect =
    (mapStateToProps = (state) => state, mapDispatchToProps) =>
    (WrapComponent) =>
    (props) => {
        // 获取store
        const store = useContext(Context);
        const { getState, dispatch, subscribe } = store;
        // 获取state，放入mapStateToProps的参数中
        const stateProps = mapStateToProps(getState());

        // dispatch
        let dispatchProps = {
            dispatch,
        };
        if (typeof mapDispatchToProps === 'function') {
            dispatchProps = mapDispatchToProps(dispatch);
        } else if (typeof mapDispatchToProps === 'object') {
            dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        }
        // 函数式组件实现forceUpdate方法
        const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
        useLayoutEffect(() => {
            const unsubscribe = subscribe(() => {
                forceUpdate();
            });
            return () => {
                if (unsubscribe) unsubscribe();
            };
        }, [store]);
        return <WrapComponent {...props} {...stateProps} {...dispatchProps} />;
    };

// 自定义hook
export function useSelector(fn) {
    const store = useStore();
    const { getState, subscribe } = store;
    const selectState = fn(getState());

    // 保证dispatch时更新
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate();
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [store]);

    return selectState;
}
export function useDispatch() {
    const store = useStore();
    const { dispatch } = store;
    return dispatch;
}
function useStore() {
    const store = useContext(Context);
    return store;
}
