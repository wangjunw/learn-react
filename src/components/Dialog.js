import React, { Component } from 'react';
import { createPortal } from 'react-dom';

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
    }
    componentWillUnmount() {
        document.body.removeChild(this.node);
    }
    render() {
        // createPortal自定义组件要插入的位置，默认是父组件中
        return createPortal(<h3>Dialog</h3>, this.node);
    }
}
