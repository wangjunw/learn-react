import React, { Component, createContext } from 'react';
import { RouterContext } from './Context';

export default class Link extends Component {
    static contextType = RouterContext;
    handleClick = (e) => {
        e.preventDefault();
        this.context.history.push(this.props.to);
    };
    render() {
        const { to, children, ...restProps } = this.props;
        return (
            <a href={to} {...restProps} onClick={this.handleClick}>
                {children}
            </a>
        );
    }
}
