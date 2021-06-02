import React, { Component } from 'react';

const Input = (props) => {
    return <input {...props} />;
};
export default class MyInput extends Component {
    render() {
        const { value = '', ...otherProps } = this.props;
        return (
            <div>
                <Input value={value} {...otherProps} />
            </div>
        );
    }
}
