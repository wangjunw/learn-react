import React, { Component, useEffect } from 'react';
import Form, { Field } from '../components/myForm';
import Input from '../components/Input';
export default function MyRCFieldForm() {
    // 函数式组件使用自定义hook，存整体form数据的
    const [form] = Form.useForm();
    // 如果这里是类组件，使用ref，但是ref无法通过props传递，需要使用forwardRef接收
    // formRef = React.createRef();
    const nameRules = [{ required: true, message: '姓名为必填' }];
    const passwordRules = [{ required: true, message: '请输入密码' }];
    const onFinish = (val) => {
        console.log('success', val);
    };
    const onFinishFailed = (val) => {
        console.log('failed', val);
    };
    useEffect(() => {
        // form.setFieldsValue({ username: 'default' });
        console.log('form', form);
    });
    return (
        <div>
            <h3>MyRCFieldForm</h3>
            <Form
                form={form}
                // ref={this.formRef}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Field name="username" label="姓名" rules={nameRules}>
                    <Input placeholder="请输入姓名" />
                </Field>
                <Field name="password" label="密码" rules={passwordRules}>
                    <Input placeholder="请输入密码" />
                </Field>
                <button>Submit</button>
            </Form>
        </div>
    );
}
