import React, { Component } from 'react';
import { RouterContext } from './Context';
import LifeCycle from './LifeCycle';
export default class Redirect extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(context) => {
                    const { history } = context;
                    const { from, to, push = false } = this.props;
                    return (
                        <LifeCycle
                            onMount={() => {
                                console.log(history, from);
                                if (from) {
                                    if (history.location.pathname === from)
                                        push
                                            ? history.push(to)
                                            : history.replace(to);
                                } else {
                                    push
                                        ? history.push(to)
                                        : history.replace(to);
                                }
                            }}
                        ></LifeCycle>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}
