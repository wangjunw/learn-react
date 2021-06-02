import React, { Component } from 'react';
import Dialog from '../components/Dialog';
export default class DialogPage extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
        };
    }
    toggle = () => {
        this.setState({
            show: !this.state.show,
        });
    };
    render() {
        return (
            <div>
                <button onClick={this.toggle}>弹窗</button>
                {this.state.show ? <Dialog></Dialog> : null}
            </div>
        );
    }
}
