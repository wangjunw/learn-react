import React from 'react';
import { FormContext } from './FormContext';
import useForm from './useForm';

// 使用forwardRef转发ref可以使得组件可以在第二参数接收到父组件中定义的ref
export default function Form(props, ref) {
    const { children, onFinish, onFinishFailed, form } = props;
    const [formStore] = useForm(form);

    // 配合forwardRef使用，可以返回自定义暴露给父组件的ref实例
    React.useImperativeHandle(ref, () => formStore);

    formStore.setCallback({
        onFinish,
        onFinishFailed,
    });
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                formStore.submit();
            }}
        >
            <FormContext.Provider value={formStore}>
                {children}
            </FormContext.Provider>
        </form>
    );
}
