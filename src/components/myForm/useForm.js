import React, { useRef } from 'react';

// 存所有form数据
class FormStore {
    constructor() {
        this.store = {}; // 所有表单值
        this.fieldEntities = []; // 所有表单实例
        this.callbacks = {}; // 所有回调，提交成功或失败
    }
    getFieldValue = (name) => {
        return this.store[name];
    };
    getFieldsValue = () => {
        return this.store;
    };
    setFieldsValue = (newVal) => {
        // 这里仅仅修改了表单值，界面没有刷新
        this.store = {
            ...this.store,
            ...newVal,
        };
        // 需要找到对应的field，执行强制更新函数
        this.fieldEntities.forEach((entity) => {
            // 找到要更新的组件
            const { name } = entity.props;
            Object.keys(newVal).forEach((key) => {
                if (key == name) {
                    entity.onFieldChange();
                }
            });
        });
    };
    // 向Field组件提供注册方法，以便之后调用组件的实例
    registerField = (field) => {
        this.fieldEntities.push(field);
        return () => {
            this.fieldEntities = this.fieldEntities.filter(
                (item) => item != field
            );
            delete this.store[field.props.name];
        };
    };
    setCallback = (cb) => {
        this.callbacks = {
            ...this.callbacks,
            ...cb,
        };
    };
    validate = () => {
        let err = [];
        // 简单验证第一条规则
        this.fieldEntities.forEach((entity) => {
            const { name, rules } = entity.props;
            let value = this.getFieldValue(name);
            let rule = rules && rules[0];
            if (
                rule &&
                rule.required &&
                (value === undefined || value === '')
            ) {
                err.push({
                    [name]: rule.message,
                    value,
                });
            }
        });
        return err;
    };
    submit = () => {
        let err = this.validate();
        if (err.length) {
            this.callbacks.onFinishFailed(err);
        } else {
            this.callbacks.onFinish(this.store);
        }
    };
    getForm = () => {
        return {
            setFieldsValue: this.setFieldsValue,
            getFieldsValue: this.getFieldsValue,
            getFieldValue: this.getFieldValue,
            registerField: this.registerField,
            submit: this.submit,
            setCallback: this.setCallback,
        };
    };
}
export default function useForm(form) {
    const formRef = useRef();
    if (!formRef.current) {
        // 如果已有form，直接复用
        if (form) {
            formRef.current = form;
        } else {
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }
    return [formRef.current];
}
