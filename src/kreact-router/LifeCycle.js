import React, { Component } from 'react';

export default class LifeCycle extends Component {
    componentDidMount() {
        if (this.props.onMount) {
            // 第二个this为参数，把this传到父组件
            this.props.onMount.call(this, this);
        }
    }
    componentWillUnmount() {
        if (this.props.onUnMount) {
            this.props.onUnMount.call(this, this);
        }
    }
    render() {
        return null;
    }
}
