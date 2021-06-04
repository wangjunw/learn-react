import React, { Component } from 'react';
import { matchPath } from 'react-router';
import { RouterContext } from './Context';

export default class Switch extends Component {
    // 遍历children，找到第一个匹配的返回
    render() {
        return (
            <RouterContext.Consumer>
                {(context) => {
                    let match, element; //能否找到匹配元素，匹配的元素
                    let { children } = this.props;
                    const { location } = context;
                    React.Children.forEach(children, (child) => {
                        // 如果目前没有匹配到并且是一个有效的元素
                        if (!match && React.isValidElement(child)) {
                            const { path } = child.props;
                            match = path
                                ? matchPath(location.pathname, child.props)
                                : context.match;
                            if (match) element = child;
                        }
                    });
                    return match
                        ? React.cloneElement(element, { computedMatch: match })
                        : null;
                }}
            </RouterContext.Consumer>
        );
    }
}
