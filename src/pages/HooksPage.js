import React, { useEffect, useLayoutEffect, useReducer } from 'react';
import { countReducer } from '../store';

const init = (initArg) => {
    return initArg + 100;
};

export default function HooksPage() {
    // 抽离了state和修改state得方法，比直接使用state更清爽
    // 第三个参数为一个函数，可以惰性得对state初始值求值
    const [state, dispatch] = useReducer(countReducer, 0, init);

    // 第二个参数为依赖项
    useEffect(() => {
        console.log('useEffect', state);
    }, [state]);
    useLayoutEffect(() => {
        console.log('useLayoutEffect');
    });
    return (
        <div>
            <h3>HooksPage</h3>
            <p>{state}</p>
            <button onClick={() => dispatch({ type: 'ADD' })}>加1</button>
        </div>
    );
}
