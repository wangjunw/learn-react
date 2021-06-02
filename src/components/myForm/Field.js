import React, { Component } from 'react';
import { FormContext } from './FormContext';

export default class Field extends Component {
    static contextType = FormContext;
    componentDidMount() {
        // 组件加载完成之后，注册到formStore中
        this.cancelRegister = this.context.registerField(this);
    }
    componentWillUnmount() {
        this.cancelRegister && this.cancelRegister();
    }
    onFieldChange = () => {
        this.forceUpdate();
    };
    getProps = () => {
        const { getFieldValue, setFieldsValue } = this.context;
        const { name } = this.props;
        return {
            value: getFieldValue(name),
            onChange: (e) => {
                const newVal = e.target.value;
                setFieldsValue({ [name]: newVal });
            },
        };
    };
    render() {
        const { children } = this.props; // 相当于插槽

        // 包装一层，添加一些属性，通过getProps方法生成
        const cloneChild = React.cloneElement(children, this.getProps());
        return cloneChild;
    }
}
