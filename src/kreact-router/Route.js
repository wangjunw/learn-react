import React, { Component } from 'react';
import { matchPath } from 'react-router';
import { RouterContext } from './Context';

export default class Route extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {(context) => {
                    const { location } = context;
                    const { path, component, children, render, computedMatch } =
                        this.props;
                    const match = computedMatch
                        ? computedMatch
                        : path
                        ? matchPath(location.pathname, this.props)
                        : context.match;
                    const props = {
                        ...context,
                        location,
                        match,
                    };
                    // match： children, component, render | null
                    // not match：children function | null
                    return (
                        <RouterContext.Provider value={props}>
                            {match
                                ? children
                                    ? typeof children === 'function'
                                        ? children(props)
                                        : children
                                    : component
                                    ? React.createElement(component, props)
                                    : render
                                    ? render(props)
                                    : null
                                : typeof children === 'function'
                                ? children(props)
                                : null}
                        </RouterContext.Provider>
                    );
                }}
            </RouterContext.Consumer>
        );
    }
}
