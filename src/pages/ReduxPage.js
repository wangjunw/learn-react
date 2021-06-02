import React, { Component } from 'react';
import store from '../store';
export default class ReduxPage extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }
    add = () => {
        store.dispatch((dispatch) => {
            setTimeout(() => {
                dispatch({ type: 'ADD' });
            }, 1000);
        });
    };
    minus = () => {
        store.dispatch(
            Promise.resolve({
                type: 'MINUS',
                payload: 2,
            })
        );
    };
    minusSync = () => {
        store.dispatch({
            type: 'MINUS',
            payload: Promise.resolve(1),
        });
    };
    render() {
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{store.getState()}</p>
                <button onClick={this.add}>加加加</button>
                <button onClick={this.minus}>减减</button>
                <button onClick={this.minusSync}>异步减</button>
            </div>
        );
    }
}
