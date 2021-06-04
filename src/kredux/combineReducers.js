export default function (reducers) {
    // 返回一个总的原始类型的reducer函数
    return (state = {}, action) => {
        let nextState = {};
        let hasChange = false; // 判断是否改变，决定返回新旧的值
        for (const key in reducers) {
            let reducer = reducers[key];
            nextState[key] = reducer(state[key], action);
            hasChange = hasChange || nextState[key] !== state[key]; //只能监听到值得改变
        }
        // 增加判断引用类型数据得长度是否改变
        hasChange =
            hasChange ||
            Object.keys(nextState).length !== Object.keys(state).length;
        return hasChange ? nextState : state;
    };
}
