import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../kreact-redux/';
export default function ReactReduxHookPage() {
    const count = useSelector(({ count }) => count);
    const dispatch = useDispatch();
    const add = useCallback(() => {
        dispatch({ type: 'ADD' });
    }, []);
    return (
        <div>
            <h3>ReactReduxHookPage</h3>
            <p>{count}</p>
            <button onClick={add}>++</button>
        </div>
    );
}
